import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import AboutUs from './aboutUs';
import Login from './login';
import Nav from './nav';
import Slides from './slides';
import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.getImages = this.getImages.bind(this);
    this.setView = this.setView.bind(this);
    this.setToggle = this.setToggle.bind(this);

    this.state = {
      photos: {},
      view: 'login',
      toggle: '',
      images: {
        headshot: [],
        athletic: [],
        professional: [],
        adventurous: [],
      },
    };
    this.render();
  }
  setToggle() {
    this.setState({ toggle: this.state.toggle === 'toggled' ? '' : 'toggled' });
  }
  setView(view) {
    this.setState({ view });
  }
  getImages() {
    const end = new Date();
    const start = new Date(end);
    start.setFullYear(end.getFullYear() - 2);
    const max = 2000;

    const formatDate = date => {
      const month = ((date.getMonth() + 1) + 100).toString().slice(1, 3);
      const day = (date.getDate() + 100).toString().slice(1, 3);
      const year = date.getFullYear();
      return `${year}-${month}-${day}`;
    };

    FB.api(`me/photos?type=tagged&fields=images,created_time&limit=${max}&until=${formatDate(end)}&since=${formatDate(start)}`, response => {
      console.log(response);
      // includes filtering out links with '&' as this seems to cause an issue for calrifai api.
      let imagesArray = response.data.map((item) => {
        for (let i = 0; i < item.images.length; i++) {
          if (item.images[i].source.indexOf('&') === -1) {
            return item.images[i].source;
          }
        }
        return '';
      });
      // remove blanks from array
      imagesArray = _.filter(imagesArray, d => d !== '');

      const data = {
        id: window.fbId,
        photos: response,
      };
      $.post({
        url: 'api/categorize',
        data: JSON.stringify(imagesArray),
        contentType: 'application/json',
      })
      .done((categorizedImages) => {
        console.log(categorizedImages);
        this.setState({ images: categorizedImages });
      })
      .fail(err => console.error(err));
    });
  }
  render() {
    const views = {
      login: (<Login setView={this.setView} getImages={this.getImages} />),
      // slides: (<Slides photos={this.state.photos} />),
      slides: (
        <div id="wrapper" className={this.state.toggle}>
          <Nav setView={this.setView} />
          <div id="page-content-wrapper">
            <div className="horizontalBar">
              <button id="menu-toggle" className="btn btn-lg" onClick={this.setToggle}>
                <span id="hamburger" className="glyphicon glyphicon-menu-hamburger"></span>
              </button>
            </div>
            <Slides photos={this.state.photos} images={this.state.images} />
          </div>
        </div>
      ),
      aboutUs: (
        <div id="wrapper" className={this.state.toggle}>
          <Nav setView={this.setView} />
          <div id="page-content-wrapper">
            <div className="horizontalBar">
              <button id="menu-toggle" className="btn btn-lg" onClick={this.setToggle}>
                <span id="hamburger" className="glyphicon glyphicon-menu-hamburger"></span>
              </button>
            </div>
            <AboutUs />
          </div>
        </div>
      ),
    };
    return (<div>{views[this.state.view]}</div>);
  }

}
ReactDOM.render(<App />, document.getElementsByClassName('mounting')[0]);
// ReactDOM.render(<App />, document.body);


// render((
//   <Router history={hashHistory}>
//     <Route path="/" component={Login} />
//     <Route path="/login" component={Login} />
//     <Route component={Main}>
//       <Route path="create" component={Form} />
//       <Route path="/slides" component={Slides} />
//     </Route>
//   </Router>
//   ), document.getElementsByClassName('mounting')[0]);

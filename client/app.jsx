import React from 'react';
import ReactDOM from 'react-dom';
// import { Router, Route, hashHistory } from 'react-router';

import Login from './login';
// import Main from './main';
// // import Feed from './feed';
// import Form from './form';
import Slides from './slides';
// import { Button } from 'react-bootstrap';
// import $ from 'jquery';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.setView = this.setView.bind(this);
    this.state = {
      photos: {},
      view: 'login',
    };
    this.views = {
      login: (<Login setView={this.setView} />),
      slides: (<Slides photos={this.state.photos} />),
    };
    this.render();
  }
  setView(view) {
    this.setState({ view });
  }
  render() {
    return (<div>{this.views[this.state.view]}</div>);
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

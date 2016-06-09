import React from 'react';
import Promise from 'bluebird';
import $ from 'jquery';
import { hashHistory } from 'react-router';
import _ from 'lodash';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      endDate: null,
      options: null,
      images: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.dropdownSelect = this.dropdownSelect.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  submitHandler(startDate, endDate) {
    console.log(startDate, endDate, 'in submit handler');
    const formatDate = (date) => {
      const month = ((date.getMonth() + 1) + 100).toString().slice(1, 3);
      const day = (date.getDate() + 100).toString().slice(1, 3);
      const year = date.getFullYear();
      return `${year}-${month}-${day}`;
    };
    const end = new Date();
    const start = new Date(end);
    start.setFullYear(end.getFullYear() - 2);
    const max = 2000;

    FB.api(`me/photos?fields=images,created_time&limit=${max}&until=${formatDate(end)}&since=${formatDate(start)}`, response => {
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
      this.setState({ images: imagesArray });

      console.log(JSON.stringify(imagesArray, null, 2));

      const data = {
        id: window.fbId,
        photos: response,
      };
      $.post({
        url: 'api/categorize',
        data: JSON.stringify(imagesArray),
        contentType: 'application/json'
      })
      .done((d) => {
        console.log(`got the d ${JSON.stringify(d, null, 2)}`);
        console.log('yess');
      })
      .fail(err => console.error(err));
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('start is', this.state.startDate);
    console.log('end is', this.state.endDate);

    this.submitHandler(this.state.startDate, this.state.endDate);
  }

  dropdownSelect(e) {
    this.setState({ options: e.target.value });
  }

  render() {
    return (
      <div className="inputForm">
        <button type="submit" onClick={this.handleSubmit}>See your photos</button>
        <div>
         {this.state.images.map(image => <img src={image} />)}
        </div>
      </div>
    );
  }
}

export default Form;

import React from 'react';
import Nav from './nav';
import $ from 'jquery';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = { toggle: false };
    this.changeId = this.changeId.bind(this);
    this.setToggle = this.setToggle.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }
  submitHandler(startDate, endDate, options) {
    $.post({
      url: '/create',
      data: {
        startDate,
        endDate,
        options,
      },
      success: () => {
        console.log('success');
      },
    });
  }

  changeId() {
    if (this.state.toggle) {
      return 'toggled';
    }
    return '';
  }

  setToggle() {
    console.log(this);
    this.setState({ toggle: !this.state.toggle });
  }

  render() {
    return (
      <div>
        <div id="wrapper" className={this.changeId()}>
          <Nav />
          <div id="page-content-wrapper">
            <div>
              <div className="horizontalBar">
                <button id="menu-toggle" className="btn btn-lg" onClick={this.setToggle}>
                  <span className="glyphicon glyphicon-menu-hamburger"></span>
                </button>
              </div>
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;

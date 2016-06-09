import React from 'react';
import $ from 'jquery';
import { hashHistory } from 'react-router';


class FacebookButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      userMessage: '',
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    window.fbAsyncInit = () => {
      FB.init({
        appId      : '1614598852200788',
        xfbml      : true,
        version    : 'v2.6',
      });
      console.log('init fbook', window.FB);
    };

    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "//connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));
  }

  checkLoginState() {
    const self = this;
    FB.getLoginStatus((response) => {
      console.log(response);
      if (response.status === 'connected') {
        self.setState({ authenticated: true });
      } else {
        FB.login((response) => {
          console.log(response, 'outside api call');
          let access_token = response.authResponse.accessToken;
          if (response.authResponse) {
            FB.api('/me', () => {
              self.setState({ authenticated: true });
              console.log('in api call', response);
              $.post('/signin', { name: response.name, userId: response.id, access_token: access_token }).done(() => {
                window.fbId = response.id;
                window.access_token = access_token;
                hashHistory.push('dashboard');
              }).fail((err) => {
                console.log(err, 'error in checkLoginState');
              });
            });
          } else {
            console.log('user did not authenticate');
          }
        }, { scope: 'public_profile,user_photos' });
      }
    }, true);
  }

  logout() {
    FB.logout(() => {
      self.setState({ authenticated: false });
      hashHistory.push('/login');
    });
  }

  handleClick(e) {
    e.preventDefault();
    if (this.state.authenticated) {
      this.logout();
    } else {
      this.checkLoginState();
    }
  }


  render() {
    return (
      <div>
        <button
          type="button"
          className="btn btn-primary btn-md"
          onClick={this.handleClick}
        >Log in with Facebook
        </button>
      </div>
    );
  }
}

export default FacebookButton;

import React from 'react';
import original from '../css/img/original.png';

class SigninControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = { isLoggedIn: false };
  }

  handleLoginClick() {
    alert(">> It's Margaret :) << ");
    this.setState({ isLoggedIn: true });
  }

  handleLogoutClick() {
    this.setState({ isLoggedIn: false });
  }

  render() {
    return (
      <div className="SocialLink">
        <script type="text/javascript" src="http://platform.linkedin.com/in.js">
          api_key: Your App Key //add your linkedIn aap key here authorize: true
        </script>
        <script type="in/Login" data-onAuth="onLinkedInAuth" />
        <a href="#">
          <img
            src={original}
            alt="linkedinbtn"
            onClick={this.handleLoginClick}
          />
        </a>
      </div>
    );
  }
}

export default SigninControl;

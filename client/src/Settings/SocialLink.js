import React from 'react';
import original from '../assets/img/original.png';
import facebook from '../assets/img/facebook.png';
import './socialLink.css';

class SigninControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = { isLoggedIn: false };
  }

  //TODO: Create function to connect to Linkedin API

  handleLoginClick() {
    alert(">> It's Margaret :) << ");
    this.setState({ isLoggedIn: true });
  }

  handleLogoutClick() {
    this.setState({ isLoggedIn: false });
  }

  render() {
    return (
      <div className="sociallink">
        <script type="text/javascript" src="http://platform.linkedin.com/in.js">
          //TODO: Add Linked-in app credentials here
          //--------------------------------------------------------------------
          api_key: '' authorize:true;
        </script>
        <script type="in/Login" data-onAuth="onLinkedInAuth" />
        <a href="#">
          <img
            src={original}
            alt="linkedinbtn"
            width="180"
            height="32"
            onClick={this.handleLoginClick}
          />
        </a>
        <a href="https://www.facebook.com/login">
          <img src={facebook} alt="facebook button" width="180" height="38" />
        </a>
      </div>
    );
  }
}

export default SigninControl;

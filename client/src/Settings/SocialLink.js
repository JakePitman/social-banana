import React from 'react';
import original from '../assets/img/original.png';
import facebook from '../assets/img/facebook.png';
import './socialLink.css';

// import socialAPI from './../services/socialAPI';

class SigninControl extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.handleLoginClick = this.handleLoginClick.bind(this);
  //   this.handleLogoutClick = this.handleLogoutClick.bind(this);
  //   this.state = { isLoggedIn: false };
  // }

  //TODO: Create function to connect to Linkedin API

  // handleLoginClick() {
  //   alert(">> It's Margaret :) << ");
  //   this.setState({ isLoggedIn: true });
  // }

  // handleLogoutClick() {
  //   this.setState({ isLoggedIn: false });
  // }

  // state = {
  //   authToken: this.props.stateCopy.authToken,
  //   connectedToLinkedIn: this.props.stateCopy.connectedToLinkedIn,
  //   linkedInURL: null
  // };

  async componentDidMount() {
    try {
      // TODO: dont get url if connected already
      console.log('hello from componentDidMount in SocialLink');
      console.log(this.state);
      // FIXME: MOVED TO APP.js
      // const res = await socialAPI.getLinkedInURL(
      //   this.props.stateCopy.authToken
      // );
      // console.log(res);
      // const { url } = res;
      // this.setState(() => {
      //   return {
      //     linkedInURL: url
      //   };
      // });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div className="sociallink">
        {this.props.stateCopy.linkedInURL ? (
          <a href={this.props.stateCopy.linkedInURL}>
            <img
              src={original}
              alt="linkedinbtn"
              width="180"
              height="32"
              onClick={this.handleLoginClick}
            />
          </a>
        ) : (
          <p>Loading url...</p>
        )}

        <a href="https://www.facebook.com/login">
          <img src={facebook} alt="facebook button" width="180" height="38" />
        </a>
      </div>
    );
  }
}

export default SigninControl;

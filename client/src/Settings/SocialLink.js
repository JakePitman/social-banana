import React from 'react';
import original from '../assets/img/original.png';
import facebook from '../assets/img/facebook.png';
import './socialLink.css';

// TODO: change name to SocialLinks
class SigninControl extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.handleLoginClick = this.handleLoginClick.bind(this);
  //   this.handleLogoutClick = this.handleLogoutClick.bind(this);
  //   this.state = { isLoggedIn: false };
  // }

  // handleLoginClick() {
  //   alert(">> It's Margaret :) << ");
  //   this.setState({ isLoggedIn: true });
  // }

  // handleLogoutClick() {
  //   this.setState({ isLoggedIn: false });
  // }

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

  // TODO: check if connected to linkedIn, no if url exists
  // TODO: same for twitter, fb wont need one as cant use oauth with fb
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
          <p>Disconnect LinkedIn button</p>
        )}

        <a href="https://www.facebook.com/login">
          <img src={facebook} alt="facebook button" width="180" height="38" />
        </a>
      </div>
    );
  }
}

export default SigninControl;

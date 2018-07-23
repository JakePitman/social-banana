import React from 'react';

import original from '../assets/img/original.png';
import facebook from '../assets/img/facebook.png';
import './socialLink.css';

class SocialLink extends React.Component {
  // on mount just for testing atm
  async componentDidMount() {
    try {
      console.log('hello from componentDidMount in SocialLink');
      console.log(this.props);
    } catch (error) {
      console.log(error);
    }
  }

  // TODO: make disconnect button
  // TODO: same for twitter, fb wont need one as cant use oauth with fb
  render() {
    const { linkedInConnected, linkedInURL } = this.props;
    return (
      <div className="sociallink">
        {linkedInConnected ? (
          <input
            type="button"
            onClick={this.handleLogout}
            value="Sign out of LinkedIn account"
          />
        ) : (
          <a href={linkedInURL}>
            <img
              src={original}
              alt="linkedinbtn"
              width="180"
              height="32"
              onClick={this.handleLoginClick}
            />
          </a>
        )}

        <a href="https://www.facebook.com/login">
          <img src={facebook} alt="facebook button" width="180" height="38" />
        </a>
      </div>
    );
  }
}

export default SocialLink;

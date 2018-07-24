import React from 'react';

import original from '../assets/img/original.png';
import twitter from '../assets/img/twitter_login_button.png';
import './socialLink.css';

class SocialLink extends React.Component {
  // on mount refresh social links, hack fix for now
  async componentDidMount() {
    console.log('hello from componentDidMount in SocialLink');
    try {
      await this.props.getSocialAuthUrls();
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const {
      linkedInURL,
      twitterURL,
      linkedInConnected,
      twitterConnected,
      handleDisconnectSocial
    } = this.props;
    return (
      <div className="sociallink">
        {linkedInConnected ? (
          <input
            type="button"
            onClick={() => {
              handleDisconnectSocial('linkedIn');
            }}
            value="Disconnect LinkedIn"
          />
        ) : (
          <a href={linkedInURL}>
            <img src={original} alt="linkedinbtn" width="180" height="32" />
          </a>
        )}

        {twitterConnected ? (
          <input
            type="button"
            value="Disconnect Twitter"
            onClick={() => {
              handleDisconnectSocial('twitter');
            }}
          />
        ) : (
          <a href={twitterURL}>
            <img src={twitter} alt="twitterbtn" width="180" height="33" />
          </a>
        )}

        {/* <a href="https://www.facebook.com/login">
          <img src={facebook} alt="facebook button" width="180" height="38" />
        </a> */}
      </div>
    );
  }
}

export default SocialLink;

import React from 'react';
import original from '../assets/img/original.png';
import twitter from '../assets/img/twitter_login_button.png';

class Provider extends React.Component {
  showModal = (content, props = {}) => {
    this.setState({
      content,
      props
    });
  };

  hideModal = () =>
    this.setState({
      content: null,
      props: {}
    });

  state = {
    content: null,
    props: {},
    showModal: this.showModal,
    hideModal: this.hideModal
  };

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

export default Provider;

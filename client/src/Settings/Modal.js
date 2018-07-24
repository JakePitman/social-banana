import React from 'react';
import original from '../assets/img/original.png';
import twitter from '../assets/img/twitter_login_button.png';
import './modal.css';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};
class SocialModal extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#000';
    this.subtitle.style.fontFamily = 'roboto';
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
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
        <div className="social-modal">
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
          <input
            type="button"
            onClick={this.openModal}
            value="Where's Pikachu?"
          />
          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <h1 ref={(subtitle) => (this.subtitle = subtitle)}>
              .. "Pika.." ..
            </h1>
            <img src="http://a.top4top.net/p_1990j031.gif" alt="Loading" />
            <button onClick={this.closeModal}>close</button>
          </Modal>
        </div>
      </div>
    );
  }
}

export default SocialModal;

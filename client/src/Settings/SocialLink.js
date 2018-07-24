import React from 'react';
import Provider from './Modal';
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
    return (
      <div className="modal">
        <Provider media="linkedin" {...this.props} />
      </div>
    );
  }
}

export default SocialLink;

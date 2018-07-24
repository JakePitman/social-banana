import React from 'react';
import SocialModal from './Modal';

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
        <SocialModal media="linkedin" {...this.props} />
      </div>
    );
  }
}

export default SocialLink;

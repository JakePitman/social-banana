import React from 'react';
import SocialModal from './Modal';

import './socialLink.css';

class SocialLink extends React.Component {
  render() {
    return (
      <div className="modal">
        <SocialModal media="linkedin" {...this.props} />
      </div>
    );
  }
}

export default SocialLink;

import React from 'react';

import SocialLink from './SocialLink';
import Profile from './Profile';
import './settings.css';

class Settings extends React.Component {
  render() {
    return (
      <div className="Account">
        <Profile media="linkedin" {...this.props} />
        <SocialLink
          media="linkedIn"
          {...this.props}
          handleDisconnectSocial={this.props.handleDisconnectSocial}
          getSocialAuthUrls={this.props.getSocialAuthUrls}
        />
      </div>
    );
  }
}
export default Settings;

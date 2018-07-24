import React from 'react';

import SocialLink from './SocialLink';
import Profile from './Profile';
import './settings.css';

class Settings extends React.Component {
  // on mount refresh social links, hack fix for now
  async componentDidMount() {
    console.log('hello from componentDidMount in Settings');
    try {
      if (this.props.authToken) {
        await this.props.getSocialAuthUrls(this.props.authToken);
      }
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    return (
      <div className="Account">
        <Profile
          media="linkedin"
          {...this.props}
          handleUpdate={this.props.handleUpdate}
        />
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

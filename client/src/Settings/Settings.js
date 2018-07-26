import React from 'react';

import SocialLink from './SocialLink';
import Profile from './Profile';
import './settings.css';

class Settings extends React.Component {
  async componentDidMount() {
    console.log('getting authURLs');
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
        <Profile media="linkedin" {...this.props} />
        <SocialLink media="linkedIn" {...this.props} />
      </div>
    );
  }
}
export default Settings;

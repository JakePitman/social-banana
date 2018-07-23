import React from 'react';

import SocialLink from './SocialLink';
import Profile from './Profile';
import './settings.css';

class Settings extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     picture: this.props.picture,
  //     name: this.props.name,
  //     company: this.props.company,
  //     phone: this.props.phone,
  //     email: this.props.email
  //   };
  //   this.handleSubmit = this.handleSubmit.bind(this);
  //   this.handleChange = this.handleSubmit.bind(this);
  //   this.handleClick = this.handleClick.bind(this);
  // }

  // handleClick = (event) => {
  //   event.preventDefault();
  //   alert('You have clicked the link');
  //   console.log('The link was clicked.');
  // };

  // handleSubmit = (event) => {
  //   event.preventDefault();
  //   alert('Updated successfully!');
  //   const user = {
  //     name: this.state.name,
  //     company: this.state.company,
  //     phone: this.state.phone
  //   }
  //     .then(function(data) {
  //       console.log(data);
  //       if (data === 'success') {
  //         this.setState({
  //           msg: 'User has been edited.'
  //         });
  //       }
  //     })
  //     .catch(function(err) {
  //       console.log(err);
  //     });
  // };

  // handleEdit(e) {
  //   e.preventDefault();
  //   alert('this passes');
  //   const { user } = {
  //     name: this.props.name,
  //     email: this.props.email,
  //     company: this.props.company,
  //     phone: this.props.phone
  //   }
  //     .then(function(data) {
  //       console.log(data);
  //       if (data === 'success') {
  //         this.setState({
  //           msg: 'User has been edited.'
  //         });
  //       }
  //     })
  //     .catch(function(err) {
  //       console.log(err);
  //     });
  // }

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
        <button
          className="cta-primary"
          type="submit"
          onClick={this.handleSubmit}
        >
          Edit
        </button>
      </div>
    );
  }
}
export default Settings;

import React from 'react';
import SigninControl from './SocialLink';
import ProfilePage from './ProfilePage';
import './settings.css';

class SettingsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      picture: this.props.picture,
      name: this.props.name,
      company: this.props.company,
      phone: this.props.phone,
      email: this.props.email,
      isOpen: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    alert('You have clicked the link');
    console.log('The link was clicked.');
  }

  handleSubmit(event) {
    alert('Updated successfully!');
    event.preventDefault();
  }

  render() {
    return (
      <div className="Account">
        <ProfilePage media="linkedin" />
        <SigninControl media="linkedIn" />
        <button className="cta-primary" type="submit">
          Update
        </button>
      </div>
    );
  }
}
export default SettingsPage;

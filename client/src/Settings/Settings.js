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
      email: this.props.email
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

  // componentDidMount() {
  //   console.log(this.match);
  //   console.log(this.state);
  // }

  render() {
    return (
      <div className="Account">
        <ProfilePage media="linkedin" stateCopy={this.props.stateCopy} />
        <SigninControl media="linkedIn" stateCopy={this.props.stateCopy} />
        <button className="cta-primary" type="submit">
          Edit
        </button>
      </div>
    );
  }
}
export default SettingsPage;

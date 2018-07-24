import React from 'react';

import margaret from '../assets/img/margaret.png';
import './profile.css';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    console.log('changed', e.target.value);
    this.setState({ value: e.target.value });
  }

  handleSubmit(e) {
    alert('A name was submitted: ' + this.state.value);
    e.preventDefault();
  }

  render() {
    const { email, name, company, phone } = this.props;
    return (
      <div className="Profile">
        <form className="profile-form" onSubmit={this.handleSubmit}>
          <div className="profile-section">
            <img
              className="profile-picture"
              src={margaret}
              width="200"
              // height="200"
              alt="user profile"
              id="imageID"
            />
            <label htmlFor="email">{email}</label>
          </div>
          <div className="profile-form-input">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              defaultValue={name}
              onChange={this.handleChange}
              name="name"
            />
            <label htmlFor="company">Company</label>
            <input
              type="text"
              defaultValue={company}
              onChange={this.handleChange}
              name="company"
            />
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              defaultValue={phone}
              onChange={this.handleChange}
              name="phone"
            />
          </div>
          <input className="cta-primary" type="submit" value="Update" />
        </form>
      </div>
    );
  }
}

export default Profile;

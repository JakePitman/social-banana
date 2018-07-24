import React from 'react';

import margaret from '../assets/img/margaret.png';
import './profile.css';

class Profile extends React.Component {
  state = {
    name: this.props.name,
    company: this.props.company,
    phone: this.props.phone,
    error: null
  };

  handleChange = (e) => {
    e.preventDefault();
    this.setState({ [`${e.target.name}`]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await this.props.handleUpdate(this.state);
      this.setState(() => ({ error: null }));
    } catch (error) {
      console.log(error);
      this.setState(() => ({ error }));
    }
  };

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
          {this.state.error && <div>{this.state.error}</div>}
          <input className="cta-primary" type="submit" value="Update" />
        </form>
      </div>
    );
  }
}

export default Profile;

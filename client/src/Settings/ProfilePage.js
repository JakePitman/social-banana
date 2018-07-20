import React from 'react';
import margaret from '../assets/img/margaret.png';
import './profilePage.css';

class ProfilePage extends React.Component {
  handleChange(event) {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    return (
      <div className="Profile">
        <form className="profile-form" action="/" method="POST">
          <div className="profile-section">
            <img
              className="profile-picture"
              src={margaret}
              width="200"
              height="200"
              alt=""
              id="imageID"
            />
            <label htmlFor="email">{this.props.stateCopy.email}</label>
            <span
              type="text"
              value={this.props.stateCopy.email}
              onChange={this.handleChange}
              name="email"
            />
          </div>
          <form className="profile-form-input">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              value={this.props.stateCopy.name}
              onChange={this.handleChange}
              name="name"
            />
            <label htmlFor="company">Company</label>
            <input
              type="text"
              value={this.props.stateCopy.company}
              onChange={this.handleChange}
              name="company"
            />
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              value={this.props.stateCopy.phone}
              onChange={this.handleChange}
              name="phone"
            />
          </form>
        </form>
      </div>
    );
  }
}

export default ProfilePage;

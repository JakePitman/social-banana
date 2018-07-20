import React from 'react';
import placeholder from '../assets/img/placeholder.png';
import './profilePage.css';

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: []
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    let self = this;
    fetch('/user', {
      method: 'GET'
    })
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error('Bad response from server');
        }
        return response.json();
      })
      .then(function(data) {
        self.setState({ user: data });
      })
      .catch((err) => {
        console.log('caught it!', err);
      });
  }

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
              src={placeholder}
              width="200"
              height="200"
              alt=""
              id="imageID"
            />
            <label htmlFor="email">Email</label>
            <span
              type="text"
              value={this.state.user.email}
              onChange={this.handleChange}
              name="email"
            />
          </div>
          <form className="profile-form-input">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              value={this.state.name}
              onChange={this.handleChange}
              name="name"
            />
            <label htmlFor="company">Company</label>
            <input
              type="text"
              value={this.state.company}
              onChange={this.handleChange}
              name="company"
            />
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              value={this.state.phone}
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

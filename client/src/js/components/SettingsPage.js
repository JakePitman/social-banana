import React from 'react'
import SocialLogin from './SocialLogin'
import placeholder from '../../css/img/placeholder.png'



class SettingsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      picture: this.props.picture,
      name: this.props.name,
      company: this.props.company,
      phone: this.props.phone,
      email: this.props.email,
      isOpen: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    alert('Updated successfully!');
    event.preventDefault();
  }

  render() {
    return (
      <div className="profile">
        <form className="profile-form" onSubmit={this.handleSubmit}>
          <div className="profile-section">
            <img
              className="profile-picture"
              src={placeholder}
              width="200"
              height="200"
              alt="profile-picture"
              id="imageID"
            />
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
          </div>
          <form className="profile-form-input">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              value={this.state.phone}
              onChange={this.handleChange}
              name="phone"
            />
            <label htmlFor="email">Email</label>
            <input
              type="text"
              value={this.state.email}
              onChange={this.handleChange}
              name="email"
            />
          </form>
          <form className="social-login">
              <SocialLogin media='linkedIn' />
          </form> 
          
          <button className="cta-primary" type="submit">
            Update
          </button>
        </form>
      </div>
    );
  }
}
export { SettingsPage };

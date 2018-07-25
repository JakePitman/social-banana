import React from 'react';
import './register.css';

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      signUp: false,
      nameField: '',
      companyField: '',
      phoneField: ''
    };
  }

  // handleRegister = () => {
  //   this.setState()
  //   }

  render() {
    return (
      <React.Fragment>
        <div className="form-input">
          <input type="name" placeholder="name" name="name" />
          <input type="text" placeholder="email" name="emailField" />
          <input type="password" placeholder="password" name="passwordField" />
          <input type="company" placeholder="company" name="company" />
          <input type="phone" placeholder="phone" name="phone" />
        </div>
        <button className="register" onClick={this.handleRegister}>
          {this.state.signUp ? '' : 'Register'}
        </button>
        {this.state.error && <p>Oops! Something went wrong!</p>}
      </React.Fragment>
    );
  }
}

export default Register;

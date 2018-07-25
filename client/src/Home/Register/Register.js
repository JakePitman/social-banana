import React from 'react';
import './register.css';

class Register extends React.Component {
  state = {
    nameField: '',
    companyField: '',
    phoneField: ''
  };

  render() {
    return (
      <div className="form-input">
        <input type="name" placeholder="name" name="name" />
        <input type="company" placeholder="company" name="company" />
        <input type="phone" placeholder="phone" name="phone" />
      </div>
    );
  }
}

export default Register;

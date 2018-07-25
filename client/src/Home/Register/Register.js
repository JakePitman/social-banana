import React from 'react';

class Register extends React.Component {
  state = {
    nameField: '',
    companyField: '',
    phoneField: ''
  };

  render() {
    return (
      <React.Fragment>
        <input type="name" placeholder="name" name="name" />
        <input type="company" placeholder="company" name="company" />
        <input type="phone" placeholder="phone" name="phone" />
      </React.Fragment>
    );
  }
}

export default Register;

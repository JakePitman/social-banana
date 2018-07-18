import React from 'react';
import logo from '../../css/img/logo.png';

const API_ENDPOINT_LOGIN = 'login';
const API_ENDPOINT_REGISTER = 'register';

class LoginForm extends React.Component {
  state = {
    formType: API_ENDPOINT_LOGIN,
    emailField: '',
    passwordField: '',
  };

  handleFormToggleOnClick = formType => e => {
    e.preventDefault();
    this.setState({ formType });
  };

  handleFieldChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // requires work for api
  handleSubmit = e => {
    console.log(this.state.emailField, this.state.passwordField);
    e.preventDefault();
  };

  render() {
    return (
      <div>
        <div id="logoWorks">
          <img src={logo} height="200" alt="logo" />
        </div>

        <div className="form-toggle">
          <button
            className={
              this.state.formType === API_ENDPOINT_LOGIN ? 'active' : ''
            }
            onClick={this.handleFormToggleOnClick('login')}
          >
            Login
          </button>
          <button
            className={
              this.state.formType === API_ENDPOINT_REGISTER ? 'active' : ''
            }
            onClick={this.handleFormToggleOnClick('register')}
          >
            Register
          </button>
        </div>

        <form className="form" onSubmit={this.handleSubmit}>
          <div className="form-content">
            <div className="form-input">
              <input
                type="text"
                placeholder="email"
                name="emailField"
                value={this.state.emailField}
                onChange={this.handleFieldChange}
              />
              <input
                type="password"
                placeholder="password"
                name="passwordField"
                value={this.state.passwordField}
                onChange={this.handleFieldChange}
              />
            </div>
            <button type="submit">
              {this.state.formType === API_ENDPOINT_LOGIN
                ? 'Login'
                : 'Register'}
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default LoginForm;

import React from 'react';
import logo from '../assets/img/logo.png';
import './login.css';
import './register.css';

const API_ENDPOINT_LOGIN = 'login';
const API_ENDPOINT_REGISTER = 'register';

class LoginForm extends React.Component {
  state = {
    formType: API_ENDPOINT_LOGIN,
    emailField: '',
    passwordField: '',
    nameField: '',
    companyField: '',
    phoneField: '',
    error: null
  };

  handleFormToggleOnClick = (formType) => (e) => {
    e.preventDefault();
    this.setState({ formType });
  };

  handleFieldChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const email = this.state.emailField;
    const password = this.state.passwordField;
    const name = this.state.nameField;
    const company = this.state.companyField;
    const phoneField = this.state.phoneField;

    const error = await this.props.handleLogin(email, password);
    if (error) {
      this.setState(() => {
        return {
          error
        };
      });
    }
  };

  componentDidMount() {
    this.props.resetRedirectHome();
  }

  render() {
    return (
      <div className="welcome">
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
                {this.state.formType === API_ENDPOINT_LOGIN ? (
                  ''
                ) : (
                  <div className="register">
                    <input
                      type="name"
                      placeholder="name"
                      value={this.state.nameField}
                      onChange={this.handleFieldChange}
                    />
                    <input
                      type="company"
                      placeholder="company"
                      value={this.state.companyField}
                      onChange={this.handleFieldChange}
                    />
                    <input
                      type="phone"
                      placeholder="phone"
                      value={this.state.phoneField}
                      onChange={this.handleFieldChange}
                    />
                  </div>
                )}
              </div>
              {this.state.error && <p>{this.state.error}</p>}
              <button type="submit">
                {this.state.formType === API_ENDPOINT_LOGIN
                  ? 'Login'
                  : 'Register'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default LoginForm;

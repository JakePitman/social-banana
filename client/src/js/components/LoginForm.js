import React from 'react';
import logo from '../../css/img/logo.png';

class LoginForm extends React.Component {
  state = {
    formType: 'login',
  };

  handleFormToggleOnClick = formType => e => {
    e.preventDefault();
    this.setState({ formType });
  };

  render() {
    return (
      <div>
        {console.log(this.state.formType)}
        <div id="logoWorks">
          <img src={logo} height="200" alt="logo" />
        </div>

        <div className="form-toggle">
          <button
            className={this.state.formType === 'login' ? 'active' : ''}
            onClick={this.handleFormToggleOnClick('login')}
          >
            Login
          </button>
          <button
            className={this.state.formType === 'login' ? '' : 'active'}
            onClick={this.handleFormToggleOnClick('register')}
          >
            Register
          </button>
        </div>

        <form className="form">
          <div className="form-content">
            <div className="form-input">
              <input type="text" placeholder="email" />
              <input type="text" placeholder="password" />
            </div>
            <button type="submit">
              {this.state.formType === 'login' ? 'Login' : 'Register'}
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default LoginForm;

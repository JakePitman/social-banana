import React from 'react';
import { Redirect } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import auth from '../../services/auth';

class Login extends React.Component {
  // const { handleLoggedIn } = props;
  constructor() {
    super();
    this.state = {
      loading: false,
      success: false,
      error: false,
      email: '',
      password: '',
    };
  }

  // handleLogin = async () => {
  //   this.setState({ loading: true });
  //   try {
  //     await new Promise((resolve) => setTimeout(resolve, 1000));
  //     auth.login();
  //     this.setState({ success: true });
  //   } catch (err) {
  //     this.setState({ error: true });
  //   }
  //   // console.log('authenticated:', auth.isAuthenticated());
  // };

  handleOnChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <React.Fragment>
        {this.state.success && <Redirect to="/" />}
        <h1>Login</h1>
        <form>
          <input
            name="email"
            type="email"
            value={this.state.email}
            onChange={this.handleOnChange}
          />
          <input
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.handleOnChange}
          />
        </form>
        <button>{this.state.loading ? 'Loading' : 'Login'}</button>
        {this.state.error && <p>Oops! Something went wrong!</p>}
      </React.Fragment>
    );
  }
}

// Login.propTypes = {
// };

// Login.defaultProps = {
// };

export default Login;

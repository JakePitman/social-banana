import React from 'react';
import { Redirect } from 'react-router-dom';
// import PropTypes from 'prop-types';
import auth from '../../services/auth';

class Login extends React.Component {
  // const { handleLoggedIn } = props;
  constructor() {
    super();
    this.state = {
      loading: false,
      success: false,
      error: false,
      emailField: '',
      passwordField: ''
    };
  }

  handleLogin = async () => {
    this.setState({ loading: true });
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      auth.login();
      this.setState({ success: true });
    } catch (err) {
      this.setState({ error: true });
    }
    // console.log('authenticated:', auth.isAuthenticated());
  };

  render() {
    return (
      <React.Fragment>
        {this.state.success && <Redirect to="/" />}
        <input type="text" placeholder="email" name="emailField" />
        <input type="password" placeholder="password" name="passwordField" />
        <button onClick={this.handleLogin}>
          {this.state.loading ? 'Loading' : 'Login'}
        </button>
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

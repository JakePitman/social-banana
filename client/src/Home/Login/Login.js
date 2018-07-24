import React from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
import auth from '../../services/auth';

class Login extends React.Component {
  // const { handleLoggedIn } = props;
  constructor() {
    super();
    this.state = {};
  }

  handleLogin = async () => {
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    await auth.login();
    console.log('authenticated:', auth.isAuthenticated());
  };
  // Created a temporary button to login by setting isLoggedIn state
  render() {
    return (
      <React.Fragment>
        <h1>Login</h1>
        <Link to="/" onClick={this.handleLogin}>
          Login
        </Link>
      </React.Fragment>
    );
  }
}

// Login.propTypes = {
// };

// Login.defaultProps = {
// };

export default Login;

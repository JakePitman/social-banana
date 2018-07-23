import React from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
import auth from '../../services/auth';

function Login() {
  // const { handleLoggedIn } = props;

  const handleLogin = async () => {
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    await auth.login();
    console.log('authenticated:', auth.isAuthenticated());
    // handleLoggedIn(auth.isAuthenticated());
  };
  // Created a temporary button to login by setting isLoggedIn state
  return (
    <React.Fragment>
      <h1>Login</h1>
      <Link to="/" onClick={handleLogin}>
        Login
      </Link>
    </React.Fragment>
  );
}

// Login.propTypes = {
//   handleLoggedIn: PropTypes.func,
// };

// Login.defaultProps = {
//   handleLoggedIn: null,
// };

export default Login;

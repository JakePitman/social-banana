import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function Login(props) {
  const { handleLoginChange } = props;
  const handleLogin = () => {
    handleLoginChange(true);
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

Login.propTypes = {
  handleLoginChange: PropTypes.func,
};

Login.defaultProps = {
  handleLoginChange: null,
};

export default Login;

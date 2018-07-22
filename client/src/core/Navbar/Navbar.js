import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Navbar(props) {
  const { isLoggedIn, handleLoginChange } = props;
  let links;

  // Function to handle logged in status of a user
  const handleLogout = () => {
    // e.preventDefault();
    handleLoginChange(false);
    // Other than changing the isLoggedIn state,
    // handling of backend due to logout should be addressed.
  };

  // Display a certain set of links depending on login state
  // MAYBE TODO: Split navbar into more components depending on login state
  if (!isLoggedIn) {
    links = (
      <React.Fragment>
        <span>
          <Link to="/register"> Register </Link>
        </span>
        <span>
          <Link to="/login"> Login </Link>
        </span>
      </React.Fragment>
    );
  } else {
    links = (
      <React.Fragment>
        <span>
          <Link to="/listing"> Listing </Link>
        </span>
        <span>
          <Link to="/settings"> Settings </Link>
        </span>
        <span>
          <Link to="/" onClick={handleLogout}>
            Logout
          </Link>
        </span>
      </React.Fragment>
    );
  }

  return <nav>{links}</nav>;
}

Navbar.propTypes = {
  isLoggedIn: PropTypes.bool,
  handleLoginChange: PropTypes.func,
};

Navbar.defaultProps = {
  isLoggedIn: false,
  handleLoginChange: null,
};

export default Navbar;

import React from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import auth from '../../services/auth';

function Navbar() {
  // let links;

  // Function to handle logged in status of a user
  // Backend handling will handled in App component
  const handleLogout = () => {
    auth.logout();
    console.log('authenticated:', auth.isAuthenticated());
    // handleLoggedIn(auth.isAuthenticated());
  };

  // Display a certain set of links depending on login state
  // MAYBE TODO: Split navbar into more components depending on login state
  const navbarLinks = (isLoggedIn) =>
    isLoggedIn ? (
      <React.Fragment>
        <li>
          <Link to="/listing"> Listing </Link>
        </li>
        <li>
          <Link to="/settings"> Settings </Link>
        </li>
        <li>
          <Link to="/" onClick={handleLogout}>
            Logout
          </Link>
        </li>
      </React.Fragment>
    ) : (
      <React.Fragment>
        <li>
          <Link to="/register"> Register </Link>
        </li>
        <li>
          <Link to="/login"> Login </Link>
        </li>
      </React.Fragment>
    );

  return (
    <nav>
      <span>
        <Link to="/"> Home </Link>
      </span>
      <ul>{navbarLinks(auth.isAuthenticated())}</ul>
    </nav>
  );
}

// Navbar.propTypes = {
//   isLoggedIn: PropTypes.bool,
//   handleLoggedIn: PropTypes.func,
// };

// Navbar.defaultProps = {
//   isLoggedIn: false,
//   handleLoggedIn: null,
// };

export default Navbar;

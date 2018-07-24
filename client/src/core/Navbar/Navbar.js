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
  const navbarLinks = () =>
    auth.isAuthenticated() && (
      <React.Fragment>
        <li>
          <Link to="/"> Home </Link>
        </li>
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
    );

  return (
    <header>
      <nav>
        <h2> Realista </h2>
        <ul>{navbarLinks()}</ul>
      </nav>

      <p> {auth.isAuthenticated() ? 'Logged In' : 'Logged Out'} </p>
    </header>
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

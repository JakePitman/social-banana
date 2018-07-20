import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar = (props) => {
  const logoutLink = (
    <button
      className="logoutButton"
      style={{ textDecoration: 'none', color: '#908F8F' }}
    >
      Logout
    </button>
  );

  const loginLink = (
    <Link
      className="navlink"
      to="/"
      style={{ textDecoration: 'none', color: '#908F8F' }}
    >
      Login
    </Link>
  );
  const settingsLink = (
    <Link
      className="navlink"
      to="/settings"
      style={{ textDecoration: 'none', color: '#908F8F' }}
    >
      Settings
    </Link>
  );
  const listingLink = (
    <Link
      className="navlink"
      to="/listing"
      style={{ textDecoration: 'none', color: '#908F8F' }}
    >
      Listing
    </Link>
  );

  const loggedInLinks = (
    <div>
      {logoutLink}
      {settingsLink}
      {listingLink}
    </div>
  );

  return (
    <div className="navbar">{props.loggedIn ? loggedInLinks : loginLink}</div>
  );
};

export default Navbar;

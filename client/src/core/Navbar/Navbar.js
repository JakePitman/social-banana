import React from 'react';
// import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import auth from '../../services/auth';
import './navbar.css';

class Navbar extends React.Component {
  // let links;
  constructor() {
    super();
    this.state = {
      success: false
    };
  }
  // Function to handle logged in status of a user
  // Backend handling will handled in App component
  handleLogout = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      auth.logout();
    } finally {
      this.setState({ success: true });
    }
    console.log('authenticated:', auth.isAuthenticated());
    // handleLoggedIn(auth.isAuthenticated());
  };

  // Display a certain set of links depending on login state
  // MAYBE TODO: Split navbar into more components depending on login state
  navbarLinks = () => {
    let navbarLinks;
    if (auth.isAuthenticated()) {
      navbarLinks = (
        <div className="navbar">
          <Link
            className="navlink"
            to="/"
            style={{ textDecoration: 'none', color: '#908F8F' }}
          >
            {' '}
            Home{' '}
          </Link>
          <Link
            className="navlink"
            to="/listing"
            style={{ textDecoration: 'none', color: '#908F8F' }}
          >
            {' '}
            Listing{' '}
          </Link>
          <Link
            className="navlink"
            to="/settings"
            style={{ textDecoration: 'none', color: '#908F8F' }}
          >
            {' '}
            Settings{' '}
          </Link>
          <button
            className="logout"
            onClick={this.handleLogout}
            style={{ textDecoration: 'none', color: '#908F8F' }}
          >
            Logout
          </button>
        </div>
      );
    }
    return navbarLinks;
  };

  navbar = () => {
    let navbar;
    if (this.state.success) {
      this.setState({ success: false });
      navbar = <Redirect to="/" />;
    } else {
      navbar = (
        <header>
          <nav>
            <ul>{this.navbarLinks()}</ul>
          </nav>
          {auth.isAuthenticated() && <p>Logged In</p>}
        </header>
      );
    }
    return navbar;
  };

  render() {
    return this.navbar();
  }
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

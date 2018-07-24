import React from 'react';
// import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import auth from '../../services/auth';

class Navbar extends React.Component {
  // let links;
  constructor() {
    super();
    this.state = {
      success: false,
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
            <button onClick={this.handleLogout}>Logout</button>
          </li>
        </React.Fragment>
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
            <h2> Realista </h2>
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

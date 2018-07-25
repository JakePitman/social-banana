import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import auth from '../../services/auth';

class Navbar extends React.Component {
  constructor() {
    super();
    this.state = {
      success: false,
    };
  }

  // Handle the logout by calling the logout API.
  // If successful, set the success state to true to cause a rerender into a redirect.
  // Then set success to false to prevent a second redirect.
  handleLogout = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      auth.logout();
      this.setState({ success: true });
    } finally {
      this.setState({ success: false });
    }
    console.log('authenticated:', auth.isAuthenticated());
  };

  // Display the Home, Listing, Settings, and Logout links if the user is authenticated.
  navbarLinks = () => {
    let navbarLinks;
    if (auth.isAuthenticated()) {
      navbarLinks = (
        <ul>
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
        </ul>
      );
    }
    return navbarLinks;
  };

  // Redirect if the success (logout) is true.
  render() {
    return this.state.success ? (
      <Redirect to="/" />
    ) : (
      <header>
        <nav>
          <h2> Realista </h2>
          {this.navbarLinks()}
        </nav>
        {auth.isAuthenticated() && <p>Logged In</p>}
      </header>
    );
  }
}

export default Navbar;

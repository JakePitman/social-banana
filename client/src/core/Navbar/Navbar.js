import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Navbar extends React.Component {
  // Handle the logout by calling the logout API.
  // If successful, set the success state to true to cause a rerender into a redirect.
  // Then set success to false to prevent a second redirect.
  handleLogout = async () => {
    try {
      await this.props.handleLogout();
      // this.setState({ success: true });
    } finally {
      // this.setState({ success: false });
    }
  };

  // Display the Home, Listing, Settings, and Logout links if the user is authenticated.
  navbarLinks = () => {
    let navbarLinks;
    if (this.props.loggedIn) {
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
    // return this.state.success ? (
    //   <Redirect to="/" />
    // ) : (
    //   <header>
    //     <nav>
    //       <h2> Realista </h2>
    //       {this.navbarLinks()}
    //     </nav>
    //     {this.props.loggedIn && <p>Logged In</p>}
    //   </header>
    // );
    return (
      <header>
        <nav>
          <h2> Realista </h2>
          {this.navbarLinks()}
        </nav>
        {this.props.loggedIn && <p>Logged In</p>}
      </header>
    );
  }
}

Navbar.propTypes = {
  handleLogout: PropTypes.func,
  loggedIn: PropTypes.bool
};

Navbar.defaultProps = {
  handleLogout: null,
  loggedIn: null
};

export default Navbar;
// import React from 'react';
// import { Link } from 'react-router-dom';

// const Navbar = (props) => {
//   const logoutLink = (
//     <Link
//       onClick={props.handleLogout}
//       className="navlink"
//       to="/"
//       style={{ textDecoration: 'none', color: '#908F8F' }}
//     >
//       Logout
//     </Link>
//   );

//   const loginLink = (
//     <Link
//       className="navlink"
//       to="/"
//       style={{ textDecoration: 'none', color: '#908F8F' }}
//     >
//       Login
//     </Link>
//   );
//   const settingsLink = (
//     <Link
//       className="navlink"
//       to="/settings"
//       style={{ textDecoration: 'none', color: '#908F8F' }}
//     >
//       Settings
//     </Link>
//   );
//   const listingLink = (
//     <Link
//       className="navlink"
//       to="/listing"
//       style={{ textDecoration: 'none', color: '#908F8F' }}
//     >
//       Listing
//     </Link>
//   );

//   const loggedInLinks = (
//     <div>
//       {logoutLink}
//       {settingsLink}
//       {listingLink}
//     </div>
//   );

//   return (
//     <div className="navbar">{props.loggedIn ? loggedInLinks : loginLink}</div>
//   );
// };

// export default Navbar;

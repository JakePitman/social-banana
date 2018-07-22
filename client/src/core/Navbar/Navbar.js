import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Navbar(props) {
  const { isLoggedIn, handleLoginChange } = props;
  let links;

  // Function to handle logged in status of a user
  // Backend handling will handled in App component
  const handleLogout = () => {
    handleLoginChange(false);
  };

  // Display a certain set of links depending on login state
  // MAYBE TODO: Split navbar into more components depending on login state
  if (!isLoggedIn) {
    links = (
      <React.Fragment>
        <li>
          <Link to="/register"> Register </Link>
        </li>
        <li>
          <Link to="/login"> Login </Link>
        </li>
      </React.Fragment>
    );
  } else {
    links = (
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
    );
  }

  return (
    <nav>
      <span>
        <Link to="/"> Home </Link>
      </span>
      <ul>{links}</ul>
    </nav>
  );
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

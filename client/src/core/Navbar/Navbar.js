import React from 'react';
import PropTypes from 'prop-types';

function Navbar(props) {
  const { isLoggedIn } = props;
  let links;

  if (!isLoggedIn) {
    links = (
      <React.Fragment>
        <span> Register </span>
        <span> Login </span>
      </React.Fragment>
    );
  } else {
    links = (
      <React.Fragment>
        <span> Listing </span>
        <span> Settings </span>
        <span> Logout </span>
      </React.Fragment>
    );
  }

  return <nav>{links}</nav>;
}

Navbar.propTypes = {
  isLoggedIn: PropTypes.bool,
};

Navbar.defaultProps = {
  isLoggedIn: false,
};

export default Navbar;

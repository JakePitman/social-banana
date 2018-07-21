import React from 'react';
import PropTypes from 'prop-types';

function Navlink(props) {
  return <li>{props.children}</li>;
}

Navlink.propTypes = {
  children: PropTypes.node,
};

Navlink.defaultProps = {
  children: null,
};

export default Navlink;

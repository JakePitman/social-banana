import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import PropTypes from 'prop-types';
import Login from './Login';
import Register from './Register';

function User() {
  return (
    <React.Fragment>
      <h1> User </h1>
      <Switch>
        <Route path="/login" render={() => <Login />} />
        <Route path="/register" component={Register} />
      </Switch>
    </React.Fragment>
  );
}

// User.propTypes = {
//   handleLoggedIn: PropTypes.func,
// };

// User.defaultProps = {
//   handleLoggedIn: null,
// };

export default User;

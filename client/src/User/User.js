import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Login from './Login';
import Register from './Register';

function User(props) {
  const { handleLoginChange } = props;
  return (
    <React.Fragment>
      <h1> User </h1>
      <Switch>
        <Route
          path="/login"
          render={() => <Login handleLoginChange={handleLoginChange} />}
        />
        <Route path="/register" component={Register} />
      </Switch>
    </React.Fragment>
  );
}

User.propTypes = {
  handleLoginChange: PropTypes.func,
};

User.defaultProps = {
  handleLoginChange: null,
};

export default User;

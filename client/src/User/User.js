import React from 'react';
import Login from './Login';
import Register from './Register';

function User() {
  return (
    <React.Fragment>
      <h1> User </h1>
      <Login />
      <Register />
    </React.Fragment>
  );
}

export default User;

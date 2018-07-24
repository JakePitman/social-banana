import React from 'react';
// import { Route, Switch } from 'react-router-dom';
// import PropTypes from 'prop-types';
import Login from './Login';
import Register from './Register';
import auth from '../services/auth';

// Want to create a login and register button that brings up
// the appropriate form.
// When a button is pressed it changes the form state
// the form state is then used to render the form
// Additionally the user forms are shown if the user is not logged in
class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      formState: 'login',
    };
  }

  // This handles whether or not the user forms are shown based on
  // login status
  showUserForms = () => {
    let showUserForms;
    if (auth.isAuthenticated()) {
      showUserForms = '';
    } else {
      showUserForms = <Login />;
    }
    return showUserForms;
  };

  render() {
    return (
      <React.Fragment>
        <h1> Homepage </h1>
        {this.showUserForms()}
      </React.Fragment>
    );
  }
}

// <Switch>
//   <Route path="/login" render={() => <Login />} />
//   <Route path="/register" component={Register} />
// </Switch>
// User.propTypes = {
//   handleLoggedIn: PropTypes.func,
// };

// User.defaultProps = {
//   handleLoggedIn: null,
// };

export default Home;

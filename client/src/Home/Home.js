import React from 'react';
// import { Route, Switch } from 'react-router-dom';
// import PropTypes from 'prop-types';
import logo from '../assets/img/logo.png';
import Login from './Login';
import Register from './Register';
import auth from '../services/auth';
import './home.css';

// Want to create a login and register button that brings up
// the appropriate form.
// When a button is pressed it changes the form state
// the form state is then used to render the form
// Additionally the user forms are shown if the user is not logged in
class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      formState: 'login'
    };
  }

  handleFormToggle = (e) => {
    this.setState({ formState: e.target.name });
  };

  showUserForms = () => {
    let showUserForms;
    if (auth.isAuthenticated()) {
      showUserForms = '';
    } else {
      showUserForms = (
        <div className="welcome">
          <img className="logo" src={logo} height="200" alt="logo" />
          <div className="form-toggle">
            <button name="login" onClick={this.handleFormToggle}>
              Login
            </button>
            <button name="register" onClick={this.handleFormToggle}>
              Register
            </button>
          </div>
          {this.userForm()}
        </div>
      );
    }
    return showUserForms;
  };

  userForm = () => {
    let userForm;
    if (this.state.formState === 'login') {
      userForm = <Login />;
    } else if (this.state.formState === 'register') {
      userForm = <Register />;
    }
    return userForm;
  };

  render() {
    return <React.Fragment>{this.showUserForms()}</React.Fragment>;
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

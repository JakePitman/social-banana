import React from 'react';
// import PropTypes from 'prop-types';
import Login from './Login';
import Register from './Register';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      formState: 'login',
    };
  }

  handleFormToggle = (e) => {
    this.setState({ formState: e.target.name });
  };

  showUserForms = () => {
    const showUserForms = (
      <React.Fragment>
        <button name="login" onClick={this.handleFormToggle}>
          Login
        </button>
        <button name="register" onClick={this.handleFormToggle}>
          Register
        </button>
        {this.state.formState === 'login' && <Login />}
        {this.state.formState === 'register' && <Register />}
      </React.Fragment>
    );
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

// User.propTypes = {
//   handleLoggedIn: PropTypes.func,
// };

// User.defaultProps = {
//   handleLoggedIn: null,
// };

export default Home;

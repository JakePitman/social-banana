import React from 'react';
import PropTypes from 'prop-types';
import Login from './Login';
import Register from './Register';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formState: 'login',
    };
  }

  handleFormToggle = (e) => {
    this.setState({ formState: e.target.name });
  };

  showUserForms = () => {
    const showUserForms = !this.props.loggedIn && (
      <React.Fragment>
        <button name="login" onClick={this.handleFormToggle}>
          Login
        </button>
        <button name="register" onClick={this.handleFormToggle}>
          Register
        </button>
        {this.state.formState === 'login' && (
          <Login
            loggedIn={this.props.loggedIn}
            handleLogin={this.props.handleLogin}
          />
        )}
        {this.state.formState === 'register' && <Register />}
      </React.Fragment>
    );
    return showUserForms;
  };

  render() {
    return (
      <React.Fragment>
        <h1> Homepage </h1>
        <p>{this.props.loggedIn.toString()}</p>
        {this.showUserForms()}
      </React.Fragment>
    );
  }
}

Home.propTypes = {
  loggedIn: PropTypes.bool,
  handleLogin: PropTypes.func,
};

Home.defaultProps = {
  loggedIn: null,
  handleLogin: null,
};

export default Home;

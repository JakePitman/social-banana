import React from 'react';
import PropTypes from 'prop-types';
import logo from '../assets/img/logo.png';
import Login from './Login';
import Register from './Register';
import './home.css';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formState: 'login'
    };
  }

  handleFormToggle = (e) => {
    this.setState({ formState: e.target.name });
  };

  showUserForms = () => {
    const showUserForms = !this.props.loggedIn && (
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
        {this.state.formState === 'login' && (
          <Login
            loggedIn={this.props.loggedIn}
            handleLogin={this.props.handleLogin}
          />
        )}
        {this.state.formState === 'register' && <Register />}
      </div>
    );
    return showUserForms;
  };

  render() {
    return (
      <React.Fragment>
        <p>{this.props.loggedIn.toString()}</p>
        {this.showUserForms()}
      </React.Fragment>
    );
  }
}

Home.propTypes = {
  loggedIn: PropTypes.bool,
  handleLogin: PropTypes.func
};

Home.defaultProps = {
  loggedIn: null,
  handleLogin: null
};

export default Home;

import React from 'react';
// import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

// import auth from '../../services/auth';

class Login extends React.Component {
  // const { handleLoggedIn } = props;
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      // success: false,
      error: false,
      email: '',
      password: ''
    };
  }

  // handleLogin = async () => {
  //   this.setState({ loading: true });
  //   try {
  //     await new Promise((resolve) => setTimeout(resolve, 1000));
  //     auth.login();
  //     this.setState({ success: true });
  //   } catch (err) {
  //     this.setState({ error: true });
  //   }
  //   // console.log('authenticated:', auth.isAuthenticated());
  // };

  handleOnChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleLogin = async () => {
    this.setState({ loading: true });
    try {
      await this.props.handleLogin(this.state.email, this.state.password);
      if (this.state.error) {
        this.setState({ error: false });
      }
      // this.setState({ success: true });
    } catch (err) {
      this.setState({ error: true });
    } finally {
      this.setState({ loading: false, email: '', password: '' });
    }
  };
  // {this.state.success && <Redirect to="/" />}

  render() {
    return (
      <React.Fragment>
        <div className="realista">
          <img
            src="https://realista.com.au/images/web/realista-new.svg"
            alt="realista-logo"
            height="20"
          />
          <h3>Where your home finds you</h3>
          <div className="entire-form">
            <h1>Login</h1>
            <div className="form">
              <form>
                <input
                  name="email"
                  type="email"
                  placeholder="email"
                  value={this.state.email}
                  onChange={this.handleOnChange}
                />
                <input
                  name="password"
                  type="password"
                  placeholder="password"
                  value={this.state.password}
                  onChange={this.handleOnChange}
                />
              </form>
              <button onClick={this.handleLogin}>
                {this.state.loading ? 'Loading' : 'Login'}
              </button>
              {this.state.error && <p>Oops! Something went wrong!</p>}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

Login.propTypes = {
  handleLogin: PropTypes.func
};

Login.defaultProps = {
  handleLogin: null
};

export default Login;

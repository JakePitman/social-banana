import React from 'react';
import PropTypes from 'prop-types';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: null,
      email: '',
      password: '',
      name: '',
      company: '',
      phone: ''
    };
  }

  handleOnChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    try {
      await this.props.handleRegister(
        this.state.email,
        this.state.password,
        this.state.name,
        this.state.company,
        this.state.phone
      );
      if (this.state.error) {
        this.setState({ error: null });
      }
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ loading: false });
    }
  };

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
            <h1>Register</h1>
            <div className="form">
              <form onSubmit={this.handleSubmit}>
                <input
                  name="email"
                  type="email"
                  placeholder="email"
                  value={this.state.email}
                  onChange={this.handleOnChange}
                  required
                />
                <input
                  name="password"
                  type="password"
                  placeholder="password"
                  value={this.state.password}
                  onChange={this.handleOnChange}
                  required
                />
                <input
                  name="name"
                  type="name"
                  placeholder="name"
                  value={this.state.name}
                  onChange={this.handleOnChange}
                  required
                />
                <input
                  name="company"
                  type="company"
                  placeholder="company"
                  value={this.state.company}
                  onChange={this.handleOnChange}
                  required
                />
                <input
                  name="phone"
                  type="phone"
                  placeholder="phone"
                  value={this.state.phone}
                  onChange={this.handleOnChange}
                  required
                />
                {this.state.error && <div>{this.state.error}</div>}
                <button type="submit" className="register">
                  {this.state.loading ? 'Loading' : 'Register'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

Register.propTypes = {
  handleRegister: PropTypes.func
};

Register.defaultProps = {
  handleRegister: null
};

export default Register;

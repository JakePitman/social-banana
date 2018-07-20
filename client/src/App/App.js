import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Login from '../Login';
import Settings from '../Settings';
import Listing from '../Listing';
import { handleToggle } from '../services/stateFunctions';
import './app.css';

import usersAPI from '../services/usersAPI';

class App extends Component {
  state = {
    loaded: false,
    loggedIn: false,
    email: null,
    authToken: null,
    linkedInToggleStatus: false,
    connectedToLinkedIn: true
  };

  async componentDidMount() {
    const authHeader = localStorage.getItem('authorization');
    if (authHeader) {
      try {
        const authToken = authHeader.split(' ')[1];
        const res = await usersAPI.getUser(authToken);
        const { user } = res;
        this.setState(() => ({
          loggedIn: true,
          authToken,
          email: user.email
        }));
      } catch (error) {
        console.log(error);
      }
    }
    this.setState(() => ({ loaded: true }));
  }

  // COMPONENT HANDLER METHODS
  handleToggle(e) {
    const target = e.target.id;
    if (target === 'linkedInToggleButton') {
      this.setState({ linkedInToggleStatus: !this.state.linkedInToggleStatus });
    } else if (target === 'facebookToggleButton') {
      // FB TOGGLE CODE CAN BE ADDED HERE
    }
  }

  handleLogin = async (email, password) => {
    try {
      const res = await usersAPI.loginUser(email, password);
      const { user, authToken } = res;
      this.setState(() => {
        return {
          loggedIn: true,
          email: user.email,
          authToken,
          connectedToLinkedIn: true
        };
      });
      localStorage.setItem('authorization', `Bearer ${authToken}`);
    } catch (error) {
      console.log(error);
      return 'Invalid combination';
    }
  };

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <div className="navbar">
            <Link
              className="navlink"
              to="/"
              style={{ textDecoration: 'none', color: '#908F8F' }}
            >
              Login
            </Link>
            <Link
              className="navlink"
              to="/settings"
              style={{ textDecoration: 'none', color: '#908F8F' }}
            >
              Settings
            </Link>
            <Link
              className="navlink"
              to="/listing"
              style={{ textDecoration: 'none', color: '#908F8F' }}
            >
              Listing
            </Link>
          </div>

          <Switch>
            <Route
              exact
              path="/"
              render={() => <Login handleLogin={this.handleLogin} />}
            />
            <Route
              path="/settings"
              render={() => <Settings stateCopy={this.state} />}
            />
            <Route
              path="/listing"
              render={() => (
                <Listing
                  stateCopy={this.state}
                  handleToggle={handleToggle.bind(this)}
                />
              )}
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

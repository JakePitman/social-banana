import React, { Component } from 'react';
import LoginForm from './LoginForm';
import { SettingsPage } from './SettingsPage';
import ListingPage from './ListingPage';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { handleToggle } from './stateFunctions';

import usersAPI from './../api/usersAPI';

class App extends Component {
  // The following code is to test the api call of our back-end
  // and the proxy we set in client/package.json
  state = {
    response: '',
    loggedIn: false,
    email: 'example@email.com',
    authToken: 'String',
    linkedInToggleStatus: false,
    connectedToLinkedIn: true
  };

  componentDidMount() {
    this.callApi()
      .then((res) => this.setState({ response: res.express }))
      .catch((err) => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  //COMPONENT HANDLER METHODS
  handleToggle(e) {
    const target = e.target.id;
    if (target === 'linkedInToggleButton') {
      this.setState({ linkedInToggleStatus: !this.state.linkedInToggleStatus });
    } else if (target === 'facebookToggleButton') {
      //FB TOGGLE CODE CAN BE ADDED HERE
    }
  }

  handleLogin = async (email, password) => {
    try {
      const res = await usersAPI.loginUser(email, password);
      const { user, authToken } = res;
      this.setState((prevState) => {
        return {
          loggedIn: true,
          email: user.email,
          authToken,
          connectedToLinkedIn: true
        };
      });
      localStorage.setItem('authorization', `Bearer ${authToken}`);
    } catch (err) {
      // handle here
      console.log(err);
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
              render={() => <LoginForm handleLogin={this.handleLogin} />}
            />
            <Route path="/settings" component={SettingsPage} />
            <Route
              path="/listing"
              render={() => (
                <ListingPage
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

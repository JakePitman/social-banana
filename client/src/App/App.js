import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link, Redirect } from 'react-router-dom';
import Login from '../Login';
import Settings from '../Settings';
import Listing from '../Listing';
import Navbar from '../core/Navbar';
import {
  handleToggle,
  resetRedirectHome,
  useRedirectHome
} from '../services/stateFunctions';
import './app.css';

// Helper Services
import usersAPI from '../services/usersAPI';
import socialAPI from '../services/socialAPI';

class App extends Component {
  state = {
    loaded: false,
    loggedIn: false,
    name: null,
    company: null,
    phone: null,
    email: null,
    authToken: null,
    linkedInToggleStatus: false,
    linkedInConnected: false,
    twitterToggleStatus: false,
    twitterConnected: false,
    linkedInURL: null,
    twitterURL: null,
    redirectHome: false
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
          email: user.email,
          name: user.name,
          company: user.company,
          phone: user.phone,
          authToken,
          linkedInToggleStatus: user.linkedInToggleStatus,
          linkedInConnected: user.linkedInConnected,
          twitterToggleStatus: user.twitterToggleStatus,
          twitterConnected: user.twitterConnected
        }));
        await this.getSocialAuthUrls(authToken);
      } catch (error) {
        console.log(error);
        this.setState(() => ({ authToken: null }));
      }
    }
    this.setState(() => ({ loaded: true }));
  }

  handleLogin = async (inputEmail, inputPassword) => {
    try {
      const res = await usersAPI.loginUser(inputEmail, inputPassword);
      const { user, authToken } = res;
      this.setState(() => {
        return {
          loggedIn: true,
          email: user.email,
          name: user.name,
          company: user.company,
          phone: user.phone,
          authToken,
          linkedInToggleStatus: user.linkedInToggleStatus,
          linkedInConnected: user.linkedInConnected,
          twitterToggleStatus: user.twitterToggleStatus,
          twitterConnected: user.twitterConnected
        };
      });
      localStorage.setItem('authorization', `Bearer ${authToken}`);
      await this.getSocialAuthUrls(authToken);
    } catch (error) {
      console.log(error);
      return 'Invalid combination';
    }
  };

  handleUpdate = async (updates) => {
    try {
      const res = await usersAPI.updateUser(updates, this.state.authToken);
      const { name, company, phone } = res.user;
      this.setState(() => ({ name, company, phone }));
    } catch (error) {
      return Promise.reject(error);
    }
  };

  handleLogout = async () => {
    try {
      localStorage.removeItem('authorization');
      this.setState(() => {
        return {
          loggedIn: false,
          name: null,
          company: null,
          phone: null,
          email: null,
          authToken: null,
          linkedInToggleStatus: false,
          linkedInConnected: false,
          twitterToggleStatus: false,
          twitterConnected: false,
          linkedInURL: null,
          twitterURL: null
        };
      });
      await usersAPI.logoutUser(this.state.authToken);
    } catch (error) {
      console.log(error);
    }
  };

  handleDisconnectSocial = async (socialMedia) => {
    alert('You are now disconnecting...');
    if (socialMedia === 'linkedIn') {
      await socialAPI.disconnectLinkedIn(this.state.authToken);
      this.setState(() => ({ linkedInConnected: false }));
    } else if (socialMedia === 'twitter') {
      await socialAPI.disconnectTwitter(this.state.authToken);
      this.setState(() => ({ twitterConnected: false }));
    }
  };

  getSocialAuthUrls = async (authToken) => {
    let twitterURL;
    let linkedInURL;
    // Get authUrls
    try {
      const res = await socialAPI.getTwitterURL(authToken);
      twitterURL = res.url;
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
    try {
      const res = await socialAPI.getLinkedInURL(authToken);
      linkedInURL = res.url;
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
    // Set State with authUrls
    console.log(twitterURL);
    console.log(linkedInURL);
    this.setState(() => {
      return {
        twitterURL,
        linkedInURL
      };
    });
    return Promise.resolve({ twitterURL, linkedInURL });
  };

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar
            loggedIn={this.state.loggedIn}
            handleLogout={this.handleLogout}
          />
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <Login
                  handleLogin={this.handleLogin}
                  resetRedirectHome={resetRedirectHome.bind(this)}
                />
              )}
            />
            <Route
              path="/settings"
              render={() => (
                <Settings
                  {...this.state}
                  handleDisconnectSocial={this.handleDisconnectSocial}
                  getSocialAuthUrls={this.getSocialAuthUrls}
                  handleUpdate={this.handleUpdate}
                />
              )}
            />
            <Route
              path="/listing"
              render={() => (
                <Listing
                  stateCopy={this.state}
                  handleToggle={handleToggle.bind(this)}
                  resetRedirectHome={resetRedirectHome.bind(this)}
                  useRedirectHome={useRedirectHome.bind(this)}
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

import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Home from '../Home';
// import Login from '../Login';
import Settings from '../Settings';
import Listing from '../Listing';
import Navbar from '../core/Navbar';
import { handleToggle } from '../services/stateFunctions';
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

  componentDidMount() {
    this.handleMount();
  }

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
    this.setState(() => ({
      twitterURL,
      linkedInURL
    }));
    return Promise.resolve({ twitterURL, linkedInURL });
  };

  handleMount = async () => {
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
  };

  handleLogin = async (inputEmail, inputPassword) => {
    try {
      const res = await usersAPI.loginUser(inputEmail, inputPassword);
      const { user, authToken } = res;
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
      localStorage.setItem('authorization', `Bearer ${authToken}`);
      await this.getSocialAuthUrls(authToken);
    } catch (error) {
      // this.setState({ loggedIn: false });
      throw error;
    }
  };

  handleLogout = async () => {
    try {
      await usersAPI.logoutUser(this.state.authToken);
      localStorage.removeItem('authorization');
      this.setState(() => ({
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
      }));
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  handleUpdate = async (updates) => {
    try {
      const res = await usersAPI.updateUser(updates, this.state.authToken);
      const { name, company, phone } = res.user;
      this.setState(() => ({ name, company, phone }));
    } catch (error) {
      // return Promise.reject(error);
      throw error;
    }
  };

  handleDisconnectSocial = async (socialMedia) => {
    if (socialMedia === 'linkedIn') {
      await socialAPI.disconnectLinkedIn(this.state.authToken);
      this.setState(() => ({ linkedInConnected: false }));
    } else if (socialMedia === 'twitter') {
      await socialAPI.disconnectTwitter(this.state.authToken);
      this.setState(() => ({ twitterConnected: false }));
    }
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
                <Home
                  loggedIn={this.state.loggedIn}
                  handleLogin={this.handleLogin}
                />
              )}
            />
            <Route
              path="/settings"
              render={() =>
                this.state.loggedIn ? (
                  <Settings
                    {...this.state}
                    handleDisconnectSocial={this.handleDisconnectSocial}
                    getSocialAuthUrls={this.getSocialAuthUrls}
                    handleUpdate={this.handleUpdate}
                  />
                ) : (
                  <Redirect to="/" />
                )
              }
            />
            <Route
              path="/listing"
              render={() =>
                this.state.loggedIn ? (
                  <Listing
                    stateCopy={this.state}
                    handleToggle={handleToggle.bind(this)}
                  />
                ) : (
                  <Redirect to="/" />
                )
              }
            />
            <Redirect from="/Listing/*" to="/Listing" />
            <Redirect from="/Settings/*" to="/Settings" />
            <Redirect to="/" />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
// <Route
//   exact
//   path="/login"
//   render={() => <Login handleLogin={this.handleLogin} />}
// />;

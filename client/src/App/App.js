import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link, Redirect } from 'react-router-dom';
import Login from '../Login';
import Settings from '../Settings';
import Listing from '../Listing';
import {
  handleToggle,
  resetRedirectHome,
  useRedirectHome
} from '../services/stateFunctions';
import './app.css';

// Helper Services
import usersAPI from '../services/usersAPI';
import socialAPI from '../services/socialAPI';
import { handleToggle } from '../services/stateFunctions';

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
    linkedInConnected: true,
    linkedInURL: null,
    redirectHome: false
  };

  // TODO: same code used twice in didMount and login, need to break down into helper function!
  async componentDidMount() {
    const authHeader = localStorage.getItem('authorization');
    if (authHeader) {
      // GET USER DATA
      try {
        const authToken = authHeader.split(' ')[1];
        const res = await usersAPI.getUser(authToken);
        const {
          email,
          name,
          company,
          phone,
          linkedInToggleStatus,
          linkedInConnected
        } = res.user;
        this.setState(() => ({
          loggedIn: true,
          email,
          name,
          company,
          phone,
          authToken,
          linkedInToggleStatus,
          linkedInConnected
        }));
      } catch (error) {
        console.log(error);
      }
      // GET LINKEDIN URL
      try {
        const res = await socialAPI.getLinkedInURL(this.state.authToken);
        const { url } = res;
        this.setState(() => {
          return {
            linkedInURL: url
          };
        });
      } catch (error) {
        console.log(error);
      }
    }
    // set page loaded
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

  // TODO: same code used twice in didMount and login, need to break down into helper function!
  handleLogin = async (inputEmail, inputPassword) => {
    try {
      // GET USER DATA
      const res = await usersAPI.loginUser(inputEmail, inputPassword);
      const { user, authToken } = res;
      const {
        email,
        name,
        company,
        phone,
        linkedInToggleStatus,
        linkedInConnected
      } = user;
      this.setState(() => {
        return {
          loggedIn: true,
          email,
          name,
          company,
          phone,
          authToken,
          linkedInToggleStatus,
          linkedInConnected
        };
      });
      localStorage.setItem('authorization', `Bearer ${authToken}`);
      try {
        // GET LINKEDIN URL
        const res = await socialAPI.getLinkedInURL(this.state.authToken);
        const { url } = res;
        this.setState(() => {
          return {
            linkedInURL: url
          };
        });
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
      return 'Invalid combination';
    }
  };

  // TODO: add userAPI call to delete authToken from user
  handleLogout = () => {
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
        linkedInURL: null
      };
    });
  };

  // TODO: hook up profile editing ong settings page
  // handleEdit(event) {
  //   event.preventDefault();
  //   var data = {
  //     name: this.state.name,
  //     email: this.state.email,
  //     id: this.state.id
  //   }
  //     .then(function(data) {
  //       console.log(data);
  //       if (data === 'success') {
  //         this.setState({
  //           msg: 'User has been edited.'
  //         });
  //       }
  //     })
  //     .catch(function(err) {
  //       console.log(err);
  //     });
  // }

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
              render={() => <Login handleLogin={this.handleLogin} />}
            />
            <Route
              path="/settings"
              render={() => <Settings {...this.state} />}
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

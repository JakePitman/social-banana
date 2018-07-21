import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Components
import Navbar from '../core/Navbar';
import Login from '../Login';
import Settings from '../Settings';
import Listing from '../Listing';
import './app.css';

// Helper Services
import usersAPI from '../services/usersAPI';
import socialAPI from '../services/socialAPI';
import { handleToggle } from '../services/stateFunctions';

class App extends Component {
  state = {
    loaded: false,
    loggedIn: false,
    name: 'margaret',
    company: 'bananaDeveloper',
    phone: '0412342123123',
    email: null,
    authToken: null,
    linkedInToggleStatus: false,
    linkedInConnected: true,
    linkedInURL: null
  };

  async componentDidMount() {
    const authHeader = localStorage.getItem('authorization');
    if (authHeader) {
      // GET USER DATA
      try {
        const authToken = authHeader.split(' ')[1];
        const res = await usersAPI.getUser(authToken);
        const { email } = res.user;
        this.setState(() => ({
          loggedIn: true,
          authToken,
          email
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
      // TODO: same code used twice, break done into helper function
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

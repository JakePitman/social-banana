import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Navbar from '../core/Navbar';
import Home from '../Home';
import Listing from '../Listing';
import Settings from '../Settings';
import User from '../User';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    };
  }

  // All login/logout backend logic to be here
  handleLoginChange = (value) => {
    this.setState({ isLoggedIn: value });
  };

  // Route will ONLY render if the route matches
  // React.Fragment mitigates unnecessary containing <div> tags
  // TODO: Make protected routes and redirect if not logged in
  // TODO: Persist state on refresh and from loading page using URL bar
  render() {
    return (
      <React.Fragment>
        <Navbar
          isLoggedIn={this.state.isLoggedIn}
          handleLoginChange={this.handleLoginChange}
        />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/listing" component={Listing} />
          <Route path="/settings" render={() => <Listing />} />
          <Route
            exact
            path="/(login|register)/"
            render={() => <User handleLoginChange={this.handleLoginChange} />}
          />
          <Redirect from="/login/*" to="/login" />
          <Redirect from="/register/*" to="/register" />
          <Redirect to="/" />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;

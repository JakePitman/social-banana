import React from 'react';
import { Route } from 'react-router-dom';
import Navbar from '../core/Navbar';
import Home from '../Home';
import Listing from '../Listing';
import Settings from '../Settings';
import User from '../User';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: true,
    };
  }

  handleLoginChange = (value) => {
    this.setState({ isLoggedIn: value });
  };

  // Route will ONLY render if the route matches
  // React.Fragment mitigates unnecessary containing <div> tags
  // TODO: Make protected routes based on isLoggedIn
  render() {
    return (
      <React.Fragment>
        <Navbar
          isLoggedIn={this.state.isLoggedIn}
          handleLoginChange={this.handleLoginChange}
        />
        <Route exact path="/" component={Home} />
        <Route path="/listing" component={Listing} />
        <Route path="/settings" component={Settings} />
        <Route
          path="/(login|register)/"
          render={() => <User handleLoginChange={this.handleLoginChange} />}
        />
      </React.Fragment>
    );
  }
}

export default App;

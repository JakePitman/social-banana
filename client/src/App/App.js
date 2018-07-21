import React from 'react';
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

  render() {
    return (
      <React.Fragment>
        <Navbar isLoggedIn={this.state.isLoggedIn} />
        <Home />
        <Listing />
        <Settings />
        <User />
      </React.Fragment>
    );
  }
}

export default App;

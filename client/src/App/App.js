import React from 'react';
import Navbar from '../core/Navbar';

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
        Realista
      </React.Fragment>
    );
  }
}

export default App;

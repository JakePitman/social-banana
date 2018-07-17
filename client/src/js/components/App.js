import React, { Component } from 'react';
import { LoginForm } from './LoginForm'
import ListingPage from './ListingPage'

class App extends Component {
  // The following code is to test the api call of our backend
  // and the proxy we set in client/package.json
  state = {
    response: '',
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    return (
      <div className="App">
        < LoginForm />
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import LoginForm from './LoginForm';
import { SettingsPage } from './SettingsPage';
import ListingPage from './ListingPage';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

class App extends Component {
  // The following code is to test the api call of our back-end
  // and the proxy we set in client/package.json
  state = {
    response: '',
    currentUser: {
      email: 'example@email.com',
      password: '123456',
      authTokens: ['String'],
      linkedIn: {
        toggleStatus: false,
        access_token: 'String',
      },
    },
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
      <BrowserRouter>
        <div className="App">
          <p>
            <Link to="/">Login</Link>
          </p>
          <p>
            <Link to="/settings">Settings</Link>
          </p>
          <p>
            <Link to="/listing">Listing</Link>
          </p>

          <Switch>
            <Route exact path="/" component={LoginForm} />
            <Route path="/settings" component={SettingsPage} />
            <Route path="/listing" component={ListingPage} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

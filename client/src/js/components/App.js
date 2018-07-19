import React, {Component} from 'react';
import LoginForm from './LoginForm';
import {SettingsPage} from './SettingsPage';
import ListingPage from './ListingPage';
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom';
import {handleToggle} from './stateFunctions';

class App extends Component {
  // The following code is to test the api call of our back-end
  // and the proxy we set in client/package.json
  state = {
    response: '',
    email: 'example@email.com',
    authToken: 'String',
    linkedInToggleStatus: false,
    connectedToLinkedIn: true,
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({response: res.express}))
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
          <div className="navbar">
            <Link
              className="navlink"
              to="/"
              style={{textDecoration: 'none', color: '#908F8F'}}>
              Login
            </Link>
            <Link
              className="navlink"
              to="/settings"
              style={{textDecoration: 'none', color: '#908F8F'}}>
              Settings
            </Link>
            <Link
              className="navlink"
              to="/listing"
              style={{textDecoration: 'none', color: '#908F8F'}}>
              Listing
            </Link>
          </div>

          <Switch>
            <Route exact path="/" component={LoginForm} />
            <Route path="/settings" component={SettingsPage} />
            <Route
              path="/listing"
              render={() => (
                <ListingPage
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

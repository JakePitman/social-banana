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
    email: 'example@email.com',
    authToken: 'String',
    linkedInToggleStatus: false,
    linkedInAccessToken: 'String'
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

  //COMPONENT HANDLER METHODS
  handleToggle(e) {
    const target = e.target.id
    if(target === 'linkedInToggleButton') {
      this.setState({linkedInToggleStatus: !this.state.linkedInToggleStatus})
    } else if (target === 'facebookToggleButton') {
      //FB TOGGLE CODE CAN BE ADDED HERE
    }
  }

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
            <Route path="/listing" render={() => 
              <ListingPage stateCopy={this.state} handleToggle={this.handleToggle.bind(this)} />}  
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

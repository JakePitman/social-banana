import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Login from '../Login';
import Settings from '../Settings';
import Listing from '../Listing';

class AppRouter extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <div className="navbar">
            <Link
              className="navlink"
              to="/"
              style={{ textDecoration: 'none', color: '#908F8F' }}
            >
              Login
            </Link>
            <Link
              className="navlink"
              to="/settings"
              style={{ textDecoration: 'none', color: '#908F8F' }}
            >
              Settings
            </Link>
            <Link
              className="navlink"
              to="/listing"
              style={{ textDecoration: 'none', color: '#908F8F' }}
            >
              Listing
            </Link>
          </div>

          <Switch>
            <Route
              exact
              path="/"
              render={() => <Login handleLogin={this.handleLogin} />}
            />
            <Route path="/settings" component={Settings} />
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

export { AppRouter };

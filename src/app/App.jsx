import React from 'react';
import AuthActions from '../actions/AuthActions';
import Store from '../store/AppStore';
import Authentication from "../components/Authentication/Authentication.jsx";
import Navigation from "../components/Navbar/Navbar.jsx";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = Store.getState();
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    Store.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    Store.removeChangeListener(this._onChange);
  }

  loginHandler(data) {
    AuthActions.signin(data);
  }

  logoutHandler() {
    AuthActions.signout();
  }

  render() {
    const isLoggedIn = this.state.auth._loggedIn;
    return (
      <div>
        <Navigation
          show={!isLoggedIn}
          logOut={this.logoutHandler}
        />
        <Authentication
          show={isLoggedIn}
          authentication={this.loginHandler}
        />
        {isLoggedIn ? this.props.children: null}
      </div>
    );
  }

  _onChange() {
    this.setState(Store.getState());
  }
}

export default App;
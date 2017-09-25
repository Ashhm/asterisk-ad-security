import React from 'react';
import AuthActions from '../Actions/AuthActions';
import Store from '../Store/Store';

import Authentication from "../components/Authntication/Authentication.jsx";
import Navigation from "../components/Navbar/Navbar.jsx";

const getStateFromFlux = () => {
    return {
        loading: Store.isLoading(),
        user: Store.getUser(),
        authenticated: Store.authenticated()
    };
};


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = getStateFromFlux();
        this._onChange = this._onChange.bind(this);
    }


    componentDidMount() {
        Store.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        Store.removeListener(this._onChange)
    }

    _onChange() {
        this.setState(getStateFromFlux());
    }

    loginHandler(data) {
        AuthActions.signin(data);
    }

    logoutHandler() {
        AuthActions.signout();
    }

    render() {
        const isLoggedIn = this.state.authenticated;
        const Main = isLoggedIn
            ? <Navigation authentication = {this.logoutHandler}/>
            : <Authentication authentication = {this.loginHandler}/>;
        return (
            <div>
               {Main}
            </div>
        );
    }
}

export default App;
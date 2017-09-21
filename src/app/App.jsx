import React from 'react';
import AuthActions from '../Actions/AuthActions';
import Store from '../Store/Store';

import Authentication from "../components/Authentication.jsx";
import Navigation from "../components/Navbar.jsx";

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

    authenticationHandler(data) {
        console.log(data);
        AuthActions.signin(data);
    }

    render() {
        return (
            <div>
                <Authentication authentication={this.authenticationHandler}/>
                <Navigation/>
            </div>
        );
    }
}

export default App;
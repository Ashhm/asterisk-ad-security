import React from 'react';

import Authentication from "../components/Authentication.jsx";

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Authentication />
        );
    }
}

export default App;
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import App from './app/App.jsx';


ReactDOM.render(
    <Router>
        <div>
            <Route component={App} />
        </div>
    </Router>,
    document.getElementById('root'));
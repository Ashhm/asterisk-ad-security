import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import App from './app/App.jsx';
import Table from './components/Table/Table.jsx'
import Log from './components/Log/Log.jsx'
import Asterisk from './components/Configuration/Asterisk.jsx'
import Common from './components/Configuration/Common.jsx'
import Ldap from './components/Configuration/Ldap.jsx'


ReactDOM.render(
    <Router history>
        <div>
            <Route component={App} />
            <Route path='/log' exact component={Log} />
            <Route path='/list' exact component={Table} />
            <Route path='/config/asterisk' exact component={Asterisk} />
            <Route path='/config/common' exact component={Common} />
            <Route path='/config/ldap' exact component={Ldap} />
        </div>
    </Router>,
    document.getElementById('root'));
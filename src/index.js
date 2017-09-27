import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import App from './app/App.jsx';
import Table from './components/Table/Table.jsx'
import Log from './components/Log/Log.jsx'
import Asterisk from './components/Configuration/Asterisk.jsx'
import Common from './components/Configuration/Common.jsx'
import Ldap from './components/Configuration/Ldap.jsx'
import Schedule from "./components/Configuration/Schedule";


ReactDOM.render(
  <Router>
    <App>
      <Switch>
        <Route path='/' exact render={() => (null)}/>
        <Route path='/log' exact component={Log}/>
        <Route path='/list' exact component={Table}/>
        <Route path='/asterisk' exact component={Asterisk}/>
        <Route path='/common' exact component={Common}/>
        <Route path='/ldap' exact component={Ldap}/>
        <Route path='/schedule' exact component={Schedule}/>
        <Route render={() => (<h2>Page not found!</h2>)}/>
      </Switch>
    </App>
  </Router>,
  document.getElementById('root'));

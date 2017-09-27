import React from 'react';
import Configuration from './Configuration.jsx';


class Ldap extends React.Component{

  render() {
    return (
      <Configuration
        title={'Ldap setting'}
        name={'ldapConfig'}
      />
    );
  }
}

export default Ldap;
import React from 'react';
import Configuration from './Configuration.jsx';


class Asterisk extends React.Component{

  render() {
    return (
      <Configuration
        title={'Astersik setting'}
        name={'asteriskConfig'}
      />
    );
  }
}

export default Asterisk;
import React from 'react';
import Configuration from './Configuration.jsx';

class Common extends React.Component {

  render() {
    return (
      <Configuration
        title={'General server setting'}
        name={'serverConfig'}
      />
    );
  }
}

export default Common;
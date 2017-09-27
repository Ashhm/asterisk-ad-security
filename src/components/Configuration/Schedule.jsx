import React from 'react';
import Configuration from './Configuration.jsx';

class Schedule extends React.Component {

  render() {
    return (
      <Configuration
        title={'Schedule setting'}
        name={'scheduleConfig'}
      />
    );
  }
}

export default Schedule;
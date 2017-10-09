import React from 'react';
import {FormGroup, FormControl, ControlLabel} from 'react-bootstrap';


class ConfigItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }


  handleChange(e) {
    this.props.changeValue(this.props.label, e.target.value)
  }

  //simple input element
  //with data from props
  render() {
    const inputType = this.props.label
      .match(/^pass\w*$/i) ? 'password' : 'text';

    return (
      <FormGroup controlId='formBasicText'>
        <ControlLabel>{this.props.label}</ControlLabel>
        <FormControl
          type={inputType}
          value={this.props.value || ''}
          placeholder='Enter configuration'
          onChange={this.handleChange}
        />
        <FormControl.Feedback/>
      </FormGroup>
    );
  }
}

export default ConfigItem;

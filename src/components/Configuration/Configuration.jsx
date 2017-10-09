import React from 'react';
import Store from '../../store/AppStore';
import ConfigItem from './ConfigItem';
import MenuActions from '../../actions/MenuActions';
import {ButtonToolbar, Button, Row} from 'react-bootstrap';


class Configuration extends React.Component {
  constructor(props) {
    super(props);
    this.state = Store.getState();
    this._onChange = this._onChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  componentDidMount() {
    Store.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    Store.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState(Store.getState());
  }

  //this "hard to understand" construction
  //is just a setState func...
  //abstraction used to reuse this component
  handleChange(key, value) {
    this.setState(prevState => ({
      setting: {
        ...prevState.setting,
        [this.props.name]: {
          ...prevState.setting[this.props.name],
          [key]: value
        }
      },
    }));
  }

  submitHandler(e) {
    e.preventDefault();
    MenuActions.saveConfigurationSetting(this.state.setting)
  }

  render() {
    console.log(this.state);
    const setting = this.state.setting[this.props.name] || {};
    const content = Object.keys(setting)
      .map((key, index) =>
        <ConfigItem
          key={index}
          label={key}
          value={setting[key]}
          changeValue={this.handleChange}
        />
      );

    return (
      <form className='container' onSubmit={this.submitHandler}>
        <h3>{this.props.title}</h3>
        {content}
        <Row bsClass='pull-right'>
          <ButtonToolbar>
            <Button bsStyle='success' type='submit' bsSize='large'>Submit</Button>
            <Button bsSize='large'>Check</Button>
          </ButtonToolbar>
        </Row>
      </form>
    );
  }
}

Configuration.defaultProps = {
  title: '',
  name: ''
};

export default Configuration;
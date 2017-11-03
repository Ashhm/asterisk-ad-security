import React from 'react';

import {Form, FormGroup, Col, FormControl, Button, ControlLabel, Panel, Image} from 'react-bootstrap';

import './Authentication.less';

class Authentication extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getValidationState() {
    const {username, password} = this.state;
    if (username.match(/^[a-z]+\\[a-z]+$/gi)
      && password.length > 7) return 'success';
    if (username || password) return 'warning';
    else return 'error';
  }

  handleUsernameChange(e) {
    this.setState({username: e.target.value});
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.authentication(this.state);
  }

  render() {
    if(this.props.show)
      return null;
    return (
      <div className='Auth__container'>
        <Panel
          className='text-center'
          header='Please enter login and password for AD authentication'
        >
          <Image
            src='./img/active-directory-logo.png'
            responsive
            rounded
          />
          <Form
            onSubmit={this.handleSubmit}
            horizontal
          >
            <FormGroup
              controlId='formHorizontalText'
              validationState={this.getValidationState()}
            >
              <Col
                componentClass={ControlLabel}
                sm={3}
                smOffset={1}
              >
                Username
              </Col>
              <Col sm={5}>
                <FormControl
                  type='text'
                  placeholder='Username...'
                  value={this.state.username}
                  onChange={this.handleUsernameChange}
                />
              </Col>
            </FormGroup>
            <FormGroup
              controlId='formHorizontalPassword'
              validationState={this.getValidationState()}
            >
              <Col
                componentClass={ControlLabel}
                sm={3}
                smOffset={1}
              >
                Password
              </Col>
              <Col sm={5}>
                <FormControl
                  type='password'
                  placeholder='Password...'
                  value={this.state.password}
                  onChange={this.handlePasswordChange}
                />
              </Col>
            </FormGroup>
            <FormGroup>
              <Col
                sm={1}
                smOffset={4}
              >
                <Button
                  type='submit'
                  bsStyle='success'
                  disabled={!(this.getValidationState() === 'success')}
                >
                  Sign in
                </Button>
              </Col>
            </FormGroup>
          </Form>
        </Panel>
      </div>
    );
  }
}

export default Authentication;
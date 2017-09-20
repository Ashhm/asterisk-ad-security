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

    render() {
        return (
            <div className='Auth__container container'>
                <Panel
                    className='text-center'
                    header='Please enter login and password for AD authentication'
                >
                        <Image
                            src='../img/active-directory-logo.png'
                            responsive
                            rounded
                        />
                    <Form horizontal>
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
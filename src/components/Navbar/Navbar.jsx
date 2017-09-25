import React from 'react';
import {NavLink} from 'react-router-dom';

import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';

import './Navbar.less';

class Navigation extends React.Component {
    render() {
        return (
            <Navbar className='Navigation__main' inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <NavLink
                            exact
                            to={'/'}
                            activeClassName='active'
                        >Active directory</NavLink>
                    </Navbar.Brand>
                    <Navbar.Toggle/>
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavItem eventKey={1} href='#'>
                            <NavLink
                                to={'/list'}
                                activeClassName='active'
                            >List</NavLink>
                        </NavItem>
                        <NavItem eventKey={2} href='#'>
                            <NavLink
                                to={'/log'}
                                activeClassName='active'
                            >Log</NavLink>
                        </NavItem>
                        <NavDropdown
                            eventKey={3}
                            title='Setting'
                            id='basic-nav-dropdown'
                        >
                            <MenuItem eventKey={3.1}>
                                <NavLink
                                    to={'/config/ldap'}
                                    activeClassName='active'
                                >Active directory</NavLink>
                            </MenuItem>
                            <MenuItem eventKey={3.2}>
                                <NavLink
                                    to={'/config/asterisk'}
                                    activeClassName='active'
                                >Asterisk</NavLink>
                            </MenuItem>
                            <MenuItem eventKey={3.3}>
                                <NavLink
                                    to={'/config/common'}
                                    activeClassName='active'
                                >Other</NavLink>
                            </MenuItem>
                        </NavDropdown>
                    </Nav>
                    <Nav pullRight>
                        <NavItem
                            eventKey={1}
                            href='#'
                            onClick={this.props.authentication}
                        >Logout</NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Navigation;
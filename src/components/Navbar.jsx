import React from 'react';

import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';

import './Navbar.less';

class Navigation extends React.Component {
    render() {
        return (
            <Navbar className='Navigation__main' inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href='#'>Active directory</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavItem eventKey={1} href='#'>List</NavItem>
                        <NavItem eventKey={2} href='#'>Log</NavItem>
                        <NavDropdown eventKey={3} title='Setting' id='basic-nav-dropdown'>
                            <MenuItem eventKey={3.1}>Active directory</MenuItem>
                            <MenuItem eventKey={3.2}>Asterisk</MenuItem>
                            <MenuItem eventKey={3.3}>Other</MenuItem>
                        </NavDropdown>
                    </Nav>
                    <Nav pullRight>
                        <NavItem eventKey={1} href='#'>Logout</NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Navigation;
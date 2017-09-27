import React from 'react';
import {LinkContainer} from 'react-router-bootstrap';
import MenuActions from '../../actions/MenuActions';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';


import './Navbar.less';

//for path props thought router i gonna use Link props
class Navigation extends React.Component {

  componentWillMount() {
    MenuActions.getConfigurationSetting();
  }

  render() {
    if (this.props.show)
      return null;
    return (
      <Navbar className='Navigation__main' inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <LinkContainer to='/'>
              <a href="#">
                Active directory
              </a>
            </LinkContainer>
          </Navbar.Brand>
          <Navbar.Toggle/>
        </Navbar.Header>

        <Navbar.Collapse>
          <Nav>
            <LinkContainer to={{
              pathname:'/list',
              props: this.props.state
            }}>
              <NavItem eventKey={1} href='#'>
                List
              </NavItem>
            </LinkContainer>

            <LinkContainer to={{
              pathname:'/log',
              props: this.props.state
            }}>
              <NavItem eventKey={2} href='#'>
                Log
              </NavItem>
            </LinkContainer>

            <NavDropdown eventKey={3} title='Setting' id='basic-nav-dropdown'>
              <LinkContainer to={{
                pathname:'/ldap',
                props: this.props.state.setting._data
              }}>
                <MenuItem eventKey={3.1}>
                  Active directory
                </MenuItem>
              </LinkContainer>

              <LinkContainer to={{
                pathname: '/asterisk'
              }}>
                <MenuItem eventKey={3.2}>
                  Asterisk
                </MenuItem>
              </LinkContainer>

              <LinkContainer to={{
                pathname: '/schedule'
              }}>
                <MenuItem eventKey={3.4}>
                  Schedule
                </MenuItem>
              </LinkContainer>

              <LinkContainer to={{
                pathname: '/common'
              }}>
                <MenuItem eventKey={3.4}>
                  Other
                </MenuItem>
              </LinkContainer>

            </NavDropdown>
          </Nav>

          <Nav pullRight>
            <NavItem eventKey={1} href='#' onClick={this.props.logOut}>
              Logout
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Navigation;
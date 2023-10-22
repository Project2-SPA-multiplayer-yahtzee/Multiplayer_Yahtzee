import React, { Component } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, Nav, NavItem, NavLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LoginMenu } from '../../api-authorization/LoginMenu';
import './NavMenu.css';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
      };
    this.state = {
          dropdownOpen: false,
    };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
    }
  toggleDropdown = () => {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  };

    render() {
        const { collapsed, dropdownOpen } = this.state;


        return (
            <Navbar expand="lg" className="bg-primary navbar-expand-lg" data-bs-theme="dark">
                <div className="container-fluid d-flex justify-content-between align-items-center">
                    <NavbarBrand tag={Link} to="/">Yahtzee!!</NavbarBrand>
                    <NavbarToggler onClick={this.toggleNavbar} type="button">
                        <span className="navbar-toggler-icon"></span>
                    </NavbarToggler>
                    <Collapse className={`navbar-collapse ${collapsed ? 'collapse' : ''}`} id="navbarColor01">
                        <Nav className="mx-auto">
                            <NavItem>
                                <NavLink tag={Link} className={`nav-link ${collapsed ? 'active' : ''}`} to="/">Home <span className="visually-hidden">(current)</span></NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} className="nav-link" to="/leaderboard">Leaderboard</NavLink>
                            </NavItem>
                            <Dropdown isOpen={dropdownOpen} toggle={this.toggleDropdown}>
                                <DropdownToggle caret className="nav-link">Rock-Paper-Scissors!</DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem tag={Link} to="/gamelobby">Game Lobby</DropdownItem>
                                    <DropdownItem tag={Link} to="/rules">Rules</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </Nav>
                    </Collapse>
                    <Nav className="ml-auto">
                        <LoginMenu />
                    </Nav>
                </div>
            </Navbar>
        );
  }
}

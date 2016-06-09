import React from 'react';
import ReactBootstrap from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { NavItem } from 'react-bootstrap';
import { Link, hashHistory } from 'react-router';

var topNav = (props) => (
    <div>
          <div id="sidebar-wrapper">
            <ul className="sidebar-nav">
                <li className="sidebar-brand">
                    <a href="#">
                        Photephra
                    </a>
                </li>
                <li>
                    <Link to="/dashboard" activeClassName="active">Dashboard</Link>
                </li>
                <li>
                    <Link to="/create" activeClassName="active">Create new story</Link>
                </li>
                <li>
                    <Link to="/slides" activeClassName="active">Slides</Link>
                </li>
            </ul>
          </div>
    </div>
);

export default topNav; 



 //  <Navbar className="navbar">   
 //    <Nav className="links">
 //      <NavItem className="brand">FotoTime</NavItem>
 //      <NavItem style={linkStyle}><Link to="/dashboard" activeClassName="active" style={linkStyle}>Dashboard</Link></NavItem>
 //      <NavItem style={linkStyle}><Link to="/create" activeClassName="active" style={linkStyle}>Create new story</Link></NavItem>
 //      <NavItem style={linkStyle}><Link to="/slides" activeClassName="active" style={linkStyle}>Slides</Link></NavItem>
 //    </Nav>
 //    <Nav pullRight>
 //      <NavItem className="logout" onClick={() => {
 //        if (window.FB) { 
 //          FB.logout();
 //        }
 //        hashHistory.push('login'); 
 //      }}>Logout</NavItem>
 //    </Nav>
 // </Navbar>


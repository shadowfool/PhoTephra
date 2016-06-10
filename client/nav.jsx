import React from 'react';
import ReactBootstrap from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { NavItem } from 'react-bootstrap';
import { Link, hashHistory } from 'react-router';

const topNav = () => (
  <Nav>
    <div id="sidebar-wrapper">
      <ul className="sidebar-nav">
        <li className="sidebar-brand">
          <a href="#">
            Photephra
          </a>
        </li>
        <li>
          <Link to="/create" activeClassName="active">Click the button</Link>
        </li>
        <li>
          <Link to="/slides" activeClassName="active">Create new Profile</Link>
        </li>
      </ul>
    </div>
  </Nav>
);

export default topNav;

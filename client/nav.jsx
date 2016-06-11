import React from 'react';
import ReactBootstrap from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { NavItem } from 'react-bootstrap';
import { Link, hashHistory } from 'react-router';

const topNav = (props) => (
  <Nav>
    <div id="sidebar-wrapper">
      <ul className="sidebar-nav">
        <li className="sidebar-brand">
          <a href="#">
            Photephra
          </a>
        </li>
        <li>
          <Link onClick={function(){props.setView('aboutUs')}} activeClassName="active">About Us</Link>
        </li>
        <li>
          <Link onClick={function(){props.setView('slides')}} activeClassName="active">Create new Profile</Link>
        </li>
      </ul>
    </div>
  </Nav>
);

export default topNav;

import React from 'react';
import './App.css';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

function Nav() {

  return (
    <nav >
      <Menu style={{textAlign: 'center'}} mode="horizontal" theme="dark">

        <Menu.Item key="mail">
          <Icon type="home" />
          <Link to="/screensource">Sources</Link>
        </Menu.Item>

        <Menu.Item key="test">
          <Icon type="read" />
          <Link to="/screenmyarticles">My Articles</Link>
        </Menu.Item>

        <Menu.Item key="app">
          <Icon type="logout" />
          <Link to="/">Logout</Link>
        </Menu.Item>

      </Menu>
    </nav>
  );
};

export default Nav;

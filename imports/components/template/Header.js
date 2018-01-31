import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Blaze from 'meteor/gadicc:blaze-react-component';
import { Meteor } from 'meteor/meteor';
import { Layout, Menu } from 'antd';
import '../../style/header.css';

const { Header } = Layout;
const styles = {
  headerStyle: {
    position: 'fixed',
    width: '100%',
    backgroundColor: '#FF5733'
  },
  menuStyle: {
    lineHeight: '64px',
    float: 'right',
    backgroundColor: '#FF5733'
  }
};

class FoodieHeader extends Component {
  render() {
    return (
      <Header className="header" style={styles.headerStyle}>
        <div className="logo"> Foodie </div>
        {Meteor.userId() ? (
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['home']}
            style={styles.menuStyle}
          >
            <Menu.Item key="home">
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="profile">
              <Link to="/profile">Profile</Link>
            </Menu.Item>
            <Menu.Item key="search">
              <Link to="/search">Search</Link>
            </Menu.Item>
            <Menu.Item key="recipe">
              <Link to="/recipe">Recipe</Link>
            </Menu.Item>
            <Menu.Item key="logout">
              <Blaze template="loginButtons" align="right" />
            </Menu.Item>
          </Menu>
        ) : (
          <Menu
            theme="dark"
            mode="horizontal"
            className="menu"
            style={styles.menuStyle}
          >
            <Menu.Item key="logout">
              <Blaze template="loginButtons" align="right" />
            </Menu.Item>
          </Menu>
        )}
      </Header>
    );
  }
}

export default FoodieHeader;

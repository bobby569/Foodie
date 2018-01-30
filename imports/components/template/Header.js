import React, { Component } from 'react';
import Blaze from 'meteor/gadicc:blaze-react-component';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Layout, Menu } from 'antd';
import './Header.css';
const { Header } = Layout;

const styles = {
  headerStyle: {
    position: 'fixed',
    width: '100%'
  },
  menuStyle: {
    lineHeight: '64px',
    float: 'right'
  }
};

class FoodieHeader extends Component {
  render() {
    return (
      <Header style={styles.headerStyle}>
        <div className="logo" />
        {Meteor.userId() ? (
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['user']}
            style={styles.menuStyle}
          >
            <Menu.Item key="user">Profile</Menu.Item>
            <Menu.Item key="recipe">Recipt</Menu.Item>
            <Menu.Item key="logout">
              <Blaze template="loginButtons" align="right" />
            </Menu.Item>
          </Menu>
        ) : (
          <Menu theme="dark" mode="horizontal" style={styles.menuStyle}>
            <Menu.Item key="logout">
              <Blaze template="loginButtons" align="right" />
            </Menu.Item>
          </Menu>
        )}
      </Header>
    );
  }
}

FoodieHeader.propTypes = {
  hasLogin: PropTypes.bool
};

export default FoodieHeader;

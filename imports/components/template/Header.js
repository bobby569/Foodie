import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Blaze from 'meteor/gadicc:blaze-react-component';
import { Meteor } from 'meteor/meteor';
import { Layout, Menu } from 'antd';
const { Header } = Layout;

class FoodieHeader extends Component {
	render() {
		return (
			<Header className="header">
				<Link to="/">
					<div className="logo">Foodie</div>
				</Link>
				{Meteor.userId() ? (
					<Menu
						theme="dark"
						mode="horizontal"
						className="menu"
						defaultSelectedKeys={['home']}
					>
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
					<Menu theme="dark" mode="horizontal" className="menu">
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

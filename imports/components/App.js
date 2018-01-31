import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import Layout from './template/Layout';
import Home from './Home';
import Recipe from './Recipe';
import Search from './Search';
import UserProfile from './UserProfile';

export default class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<Layout>
					<Switch>
						<Route path="/profile" component={UserProfile} />
						<Route path="/search" component={Search} />
						<Route path="/recipe" component={Recipe} />
						<Route path="/" component={Home} />
					</Switch>
				</Layout>
			</BrowserRouter>
		);
	}
}

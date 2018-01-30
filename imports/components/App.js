import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import Home from './Home';
import Recipe from './Recipe';
import Search from './Search';
import UserProfile from './UserProfile';

export default class App extends Component {
	render() {
		return (
			<div>
				<BrowserRouter>
					<Switch>
						<Route path="/profile" component={UserProfile} />
						<Route path="/recipe" component={Recipe} />
						<Route path="/search" component={Search} />
						<Route path="/" component={Home} />
					</Switch>
				</BrowserRouter>
			</div>
		);
	}
}

import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Layout from './template/Layout';
import Home from './Home';
import Recipe from './Recipe';
import Search from './Search';
import Profile from './Profile';

export default class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<Layout>
					{Meteor.userId() ? (
						<Switch>
							<Route exact path="/profile" component={Profile} />
							<Route exact path="/search" component={Search} />
							<Route exact path="/recipe" component={Recipe} />
						</Switch>
					) : (
						<Switch>
							<Route exact path="/" component={Home} />
							<Redirect to="/" />
						</Switch>
					)}
				</Layout>
			</BrowserRouter>
		);
	}
}

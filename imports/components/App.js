import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Layout from './template/Layout';
import Home from './Home';
import Recipe from './Recipe';
import Search from './Search';
import Profile from './Profile';

export default class App extends Component {
	render() {
		return (
			<BrowserRouter>
				{Meteor.userId() ? (
					<Layout>
						<Switch>
							<Route exact path="/profile" component={Profile} />
							<Route exact path="/search" component={Search} />
							<Route exact path="/recipe/:id" component={Recipe} />
							<Redirect to="/search" />
						</Switch>
					</Layout>
				) : (
					<Switch>
						<Route exact path="/" component={Home} />
						<Redirect to="/" />
					</Switch>
				)}
			</BrowserRouter>
		);
	}
}

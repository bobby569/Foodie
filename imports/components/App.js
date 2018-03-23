import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Layout from './template/Layout';
import Home from './Home';
import Profile from './Profile';
import Search from './Search';
import Saved from './Saved';
import Recipe from './Recipe';

export default class App extends Component {
	render() {
		return (
			<BrowserRouter>
				{Meteor.userId() ? (
					<Layout>
						<Switch>
							<Route exact path="/search" component={Profile} />
							<Route exact path="/profile" component={Search} />
							<Route exact path="/saved" component={Saved} />
							<Route exact path="/recipe/:id" component={Recipe} />
							<Redirect to="/search" />
						</Switch>
					</Layout>
				) : (
					<Switch>
						<Route exact path="/search" component={Search} />
						<Route exact path="/" component={Home} />
					</Switch>
				)}
			</BrowserRouter>
		);
	}
}

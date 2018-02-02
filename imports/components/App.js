import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import Layout from './template/Layout';
import Home from './Home';
import Recipe from './Recipe';
import Search from './Search';
import Profile from './Profile';
import { createContainer } from 'react-meteor-data';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class App extends TrackerReact(Component) {
	render() {
		return (
			<BrowserRouter>
				<Layout>
					<Switch>
						<Route exact path="/profile" component={Profile} />} />
						<Route exact path="/search" component={Search} />
						<Route exact path="/recipe" component={Recipe} />
						<Route exact path="/" component={Home} />
					</Switch>
				</Layout>
			</BrowserRouter>
		);
	}
}

// export default createContainer(route => {
// let user = Meteor.user();
// if (user) {
// 	return {
// 		user: user
// 	};
// }
// });

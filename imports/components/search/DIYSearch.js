import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import ErrorBlock from './ErrorBlock';

export default class DIYSearch extends Component {
	render() {
		return Meteor.userId() ? null : <ErrorBlock />;
	}
}

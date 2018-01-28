import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
// import { Template } from 'meteor/templating';
// import { ReactiveVar } from 'meteor/reactive-var';
import App from '../imports/components/App';

Meteor.startup(() => {
	Tracker.autorun(() => {
		ReactDOM.render(<App />, document.getElementById('app'));
	});
});

import 'antd/dist/antd.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import App from '../imports/components/App';
import '../imports/components/upload/upload.js';
import '../imports/collections/index.js';

Meteor.startup(() => {
	Tracker.autorun(() => {
		ReactDOM.render(<App />, document.getElementById('app'));
	});
});

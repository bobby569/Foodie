import React from 'react';
import { Layout } from 'antd';
import Header from './template/Header';
import Footer from './template/Footer';

export default () => (
	<Layout>
		<Header />
		<div className="home-page">
			<div className="darkgrey" />
			<div className="info">
				<h3>Welcome to Foodie!</h3>
			</div>
		</div>
		<Footer />
	</Layout>
);

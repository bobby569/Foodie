import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Footer from './Footer';
import { Layout, Breadcrumb } from 'antd';
const { Content } = Layout;

class FoodieLayout extends Component {
	render() {
		return (
			<Layout style={{ minHeight: '100vh' }}>
				<Header hasLogin={true} />
				<Content style={{ padding: '0 50px', marginTop: 64 }}>
					<div
						style={{ background: '#fff', marginTop: 50, padding: 24, minHeight: 380 }}
					>
						{this.props.children}
					</div>
				</Content>
				<Footer />
			</Layout>
		);
	}
}

FoodieLayout.propTypes = {
	children: PropTypes.element
};

export default FoodieLayout;

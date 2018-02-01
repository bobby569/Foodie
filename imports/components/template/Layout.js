import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Footer from './Footer';
import { Layout, Breadcrumb, BackTop } from 'antd';
const { Content } = Layout;

class FoodieLayout extends Component {
	render() {
		return (
			<Layout className="layout">
				<Header />
				<Content className="content">
					<div className="content__div">{this.props.children}</div>
				</Content>
				<BackTop />
				<Footer />
			</Layout>
		);
	}
}

FoodieLayout.propTypes = {
	children: PropTypes.element.isRequired
};

export default FoodieLayout;

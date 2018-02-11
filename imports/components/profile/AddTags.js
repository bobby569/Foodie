import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormControl, Button } from 'react-bootstrap';

class AddTags extends Component {
	render() {
		const { value, onEnter, onAdd, onSave } = this.props;
		return (
			<div>
				<FormControl
					type="text"
					className="input"
					placeholder="Enter ingredients here"
					value={value}
					onChange={onEnter}
				/>
				<Button className="tag addtag" onClick={onAdd}>
					Add
				</Button>
				<Button className="tag savetag" onClick={onSave}>
					Save
				</Button>
			</div>
		);
	}
}

AddTags.propTypes = {
	value: PropTypes.string.isRequired,
	onEnter: PropTypes.func.isRequired,
	onAdd: PropTypes.func.isRequired,
	onSave: PropTypes.func.isRequired
};

export default AddTags;

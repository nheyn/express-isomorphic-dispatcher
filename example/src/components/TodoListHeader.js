import React from 'react';

import TextField from './TextField';

import { BASIC_INFO_SET_TITLE } from '../stores/basicInfo';

const TodoListHeader = React.createClass({
	propTypes: {
		title: React.PropTypes.string.isRequired,
		authors: React.PropTypes.arrayOf(React.PropTypes.string.isRequired).isRequired,
		dispatch: React.PropTypes.func.isRequired
	},
	updateTitle(newTitle) {
		console.log('this.props.dispatch', {
			type: BASIC_INFO_SET_TITLE,
			title: newTitle
		});
		this.props.dispatch({
			type: BASIC_INFO_SET_TITLE,
			title: newTitle
		});
	},
	render() {
		const  { title, authors } = this.props;
		return (
			<div>
				<TextField initialValue={title} placeholder="List Title" onUpdate={this.updateTitle} />
				<div>
				{authors.map((author) =>
					<span>{author}</span>
				)}
				</div>
			</div>
		);
	}
});
export default TodoListHeader;
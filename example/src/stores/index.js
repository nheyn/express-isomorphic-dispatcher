import Immutable from 'immutable';

import basicInfo from './basicInfo';
import pageTitle from './pageTitle';
import todoList, { TodoListItem } from './todoList';

export default {
	basicInfo,
	todoList,
	pageTitle
};

// Encode / Decode store states
export function encodeState(storeName, state) {
	return JSON.stringify(
		storeName === 'todoList'?
			{ ...state, items: state.items.toJS() }:
			state
	);
}

export function decodeState(storeName, data) {
	if(storeName === 'todoList') {
		const state = JSON.parse(data);
		const { items: encodedItems } = state;
		if(!Array.isArray(encodedItems)) throw new Error('Todo list items sent to/from the server must be an array');

		const items = Immutable.List(encodedItems).map((encodedItem) => {
			return new TodoListItem(encodedItem);
		});

		return { ...state, items };
	}

	return JSON.parse(data);
}
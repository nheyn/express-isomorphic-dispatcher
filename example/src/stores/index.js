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
	if(storeName === 'todoList') return state;

	return { ...state, items: state.items.toJS() };
}

export function decodeState(storeName, data) {
	if(storeName !== 'todoList') return data;

	const { items: encodedItems } = data;
	if(!Array.isArray(encodedItems)) throw new Error('Todo list items sent to/from the server must be an array');

	const items = Immutable.List(encodedItems).map((encodedItem) => {
		return new TodoListItem(encodedItem);
	});

	return { ...data, items };
}
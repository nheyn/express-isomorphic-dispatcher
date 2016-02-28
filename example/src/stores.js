import Immutable from 'immutable';
import { createStore } from 'isomorphic-dispatcher';

// Basic Info Store
export const BASIC_INFO_SET_TITLE = 'BASIC_INFO_SET_TITLE';
export const BASIC_INFO_ADD_AUTHOR = 'BASIC_INFO_ADD_AUTHOR';
const basicInfoInitialState = {
	title: 'Untitled',
	authors: []
};

const basicInfo = createStore(basicInfoInitialState).register((state, action) => {
	if(action.type !== BASIC_INFO_SET_TITLE) return state;
	if(typeof action.title !== 'string') {
		console.error('The title for BASIC_INFO_SET_TITLE must be a string');
		return state;
	}

	console.log(state, '-', action, '->', { ...state, title: action.title});

	return { ...state, title: action.title};
}).register((state, action) => {
	if(action.type !== BASIC_INFO_ADD_AUTHOR) return state;
	if(typeof action.author !== 'string') {
		console.error('The author for BASIC_INFO_ADD_AUTHOR must be a string');
		return state;
	}

	const authors = Array.from(state.authors);
	authors.push(action.author);

	return { ...state, authors };
});

// Todo List Store
export const TODO_LIST_ADD_ITEM = 'TODO_LIST_ADD_ITEM';
export const TODO_LIST_UPDATE_DESCRIPTION = 'TODO_LIST_UPDATE_DESCRIPTION';
export const TODO_LIST_CHECK_ITEM = 'TODO_LIST_CHECK_ITEM';
export const TODO_LIST_UNCHECK_ITEM = 'TODO_LIST_UNCHECK_ITEM';
const todoListInitialState = { items: Immutable.List() };
const TodoListItem = Immutable.Record({ isChecked: false, description: '' });

const todoList = createStore(todoListInitialState).register((state, action) => {
	if(action.type !== TODO_LIST_ADD_ITEM) return state;

	let newItem = new TodoListItem();
	if(action.description) {
		if(typeof action.description !== 'string') {
			console.error('The description for TODO_LIST_ADD_ITEM must be a string');
		}

		newItem = newItem.set('description', action.description);
	}

	return {
		items: state.items.push(newItem)
	};
}).register((state, action) => {
	if(action.type !== TODO_LIST_UPDATE_DESCRIPTION) return state;
	if(typeof action.index !== 'number') {
		console.error('The index for TODO_LIST_UPDATE_DESCRIPTION must be a number');
		return state;
	}
	if(action.index < 0 || action.index > state.items.size) {
		console.error('The index for TODO_LIST_UPDATE_DESCRIPTION must be an index with in the list');
		return state;
	}
	if(typeof action.description !== 'string') {
		console.error('The description for TODO_LIST_UPDATE_DESCRIPTION must be a string');
		return state;
	}

	return {
		items: state.items.update(action.index, (item) => item.set('description', action.description))
	};
}).register((state, action ) => {
	if(action.type !== TODO_LIST_CHECK_ITEM) return state;
	if(typeof action.index !== 'number') {
		console.error('The index for TODO_LIST_CHECK_ITEM must be a number');
		return state;
	}
	if(action.index < 0 || action.index > state.items.size) {
		console.error('The index for TODO_LIST_CHECK_ITEM must be an index with in the list');
		return state;
	}

	return {
		items: state.items.update(action.index, (item) => item.set('isChecked', true))
	};
}).register((state, action ) => {
	if(action.type !== TODO_LIST_UNCHECK_ITEM) return state;
	if(typeof action.index !== 'number') {
		console.error('The index for TODO_LIST_UNCHECK_ITEM must be a number');
		return state;
	}
	if(action.index < 0 || action.index > state.items.size) {
		console.error('The index for TODO_LIST_UNCHECK_ITEM must be an index with in the list');
		return state;
	}

	return {
		items: state.items.update(action.index, (item) => item.set('isChecked', false))
	};
});

// Encode / Decode store states
export function encode(storeName, state) {
	return JSON.stringify(state);
}

export function encode(storeName, data) {
	return JSON.parse(data);
}

export default { basicInfo, todoList };
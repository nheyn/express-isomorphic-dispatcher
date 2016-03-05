import { createStore } from 'isomorphic-dispatcher';

import initialState, { TodoListItem } from './initialState';
import loadItems, { TODO_LIST_LOAD_ITEMS } from './loadItems';
import addItem, { TODO_LIST_ADD_ITEM } from './addItem';
import updateDescription, { TODO_LIST_UPDATE_DESCRIPTION } from './updateDescription';
import checkItem, { TODO_LIST_CHECK_ITEM } from './checkItem';
import uncheckItem, { TODO_LIST_UNCHECK_ITEM } from './uncheckItem';

export default createStore(initialState)
				.register(addItem)
				.register(loadItems)
				.register(updateDescription)
				.register(checkItem)
				.register(uncheckItem);

export {
	TodoListItem,
	TODO_LIST_ADD_ITEM,
	TODO_LIST_LOAD_ITEMS,
	TODO_LIST_UPDATE_DESCRIPTION,
	TODO_LIST_CHECK_ITEM,
	TODO_LIST_UNCHECK_ITEM
};
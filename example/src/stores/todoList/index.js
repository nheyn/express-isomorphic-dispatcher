import { createStore } from 'isomorphic-dispatcher';

import initialState from './initialState';
import addItem, { TODO_LIST_ADD_ITEM } from './addItem';
import updateDescription, { TODO_LIST_UPDATE_DESCRIPTION } from './updateDescription';
import checkItem, { TODO_LIST_CHECK_ITEM } from './checkItem';
import uncheckItem, { TODO_LIST_UNCHECK_ITEM } from './uncheckItem';

export default createStore(initialState)
				.register(addItem)
				.register(updateDescription)
				.register(checkItem)
				.register(uncheckItem);

export { TODO_LIST_ADD_ITEM, TODO_LIST_UPDATE_DESCRIPTION, TODO_LIST_CHECK_ITEM, TODO_LIST_UNCHECK_ITEM }
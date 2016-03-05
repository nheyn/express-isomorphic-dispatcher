import Immutable from 'immutable';

import { TodoListItem } from './initialState';

export const TODO_LIST_LOAD_ITEMS = 'TODO_LIST_LOAD_ITEMS';

export default function uncheckedItem(state, action, onServer) {
  if(action.type !== TODO_LIST_LOAD_ITEMS) return state;

  return onServer(() => {
    return { items: getItemsFromDb() };
  });
}

// Mock for database query that gets the current todo list items
function getItemsFromDb() {
  return Immutable.List([
    new TodoListItem({ description: 'Loaded Item 1' }),
    new TodoListItem({ description: 'Loaded Item 2' }),
    new TodoListItem({ description: 'Loaded Item 3' })
  ]);
}
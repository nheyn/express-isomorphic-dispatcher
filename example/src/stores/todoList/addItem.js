import { TodoListItem } from './initialState';

export const TODO_LIST_ADD_ITEM = 'TODO_LIST_ADD_ITEM';

export default function addItem(state, action) {
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
}
export const TODO_LIST_UPDATE_DESCRIPTION = 'TODO_LIST_UPDATE_DESCRIPTION';

export default function updateDescription(state, action) {
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
}
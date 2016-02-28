export const TODO_LIST_UNCHECK_ITEM = 'TODO_LIST_UNCHECK_ITEM';

export default function uncheckedItem(state, action) {
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
}
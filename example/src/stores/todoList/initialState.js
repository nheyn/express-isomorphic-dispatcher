import Immutable from 'immutable';

export const TodoListItem = Immutable.Record({ isChecked: false, description: '' });

export default {
	items: Immutable.List()
};

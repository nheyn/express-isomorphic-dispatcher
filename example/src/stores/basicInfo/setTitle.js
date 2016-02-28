export const BASIC_INFO_SET_TITLE = 'BASIC_INFO_SET_TITLE';

export default function setTitle(state, action) {
	if(action.type !== BASIC_INFO_SET_TITLE) return state;
	if(typeof action.title !== 'string') {
		console.error('The title for BASIC_INFO_SET_TITLE must be a string');
		return state;
	}

	console.log(state, '-', action, '->', { ...state, title: action.title});

	return { ...state, title: action.title};
}
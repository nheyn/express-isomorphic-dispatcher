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

	return { ...state, title: action.title}
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

export default { basicInfo };
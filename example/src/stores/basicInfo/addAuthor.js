export const BASIC_INFO_ADD_AUTHOR = 'BASIC_INFO_ADD_AUTHOR';

export default function addAuthor(state, action) {
	if(action.type !== BASIC_INFO_ADD_AUTHOR) return state;
	if(typeof action.author !== 'string') {
		console.error('The author for BASIC_INFO_ADD_AUTHOR must be a string');
		return state;
	}

	const authors = Array.from(state.authors);
	authors.push(action.author);

	return { ...state, authors };
}
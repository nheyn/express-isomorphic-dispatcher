export const BASIC_INFO_SET_TITLE = 'BASIC_INFO_SET_TITLE';

export default function setTitle(state, action, onServer) {
  if(action.type !== BASIC_INFO_SET_TITLE) return state;
  if(typeof action.title !== 'string') {
    console.error('The title for BASIC_INFO_SET_TITLE must be a string');
    return state;
  }

  return { ...state, title: action.title };
}
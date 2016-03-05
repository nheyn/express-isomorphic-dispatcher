import { createStore } from 'isomorphic-dispatcher';

import initialState from './initialState';
import setTitle, { BASIC_INFO_SET_TITLE } from './setTitle';
import addAuthor, { BASIC_INFO_ADD_AUTHOR } from './addAuthor';

// Basic Info Store
export default createStore(initialState)
                .register(setTitle)
                .register(addAuthor);

export { BASIC_INFO_SET_TITLE, BASIC_INFO_ADD_AUTHOR };
import basicInfo from './basicInfo';
import todoList from './todoList';

export default {
	basicInfo,
	todoList
};

// Encode / Decode store states
export function encode(storeName, state) {
	//TODO, fix for ImmutableJS
	return JSON.stringify(state);
}

export function encode(storeName, data) {
	//TODO, fix for ImmutableJS
	return JSON.parse(data);
}
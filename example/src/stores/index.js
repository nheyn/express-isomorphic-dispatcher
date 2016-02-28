import basicInfo from './basicInfo';
import todoList from './todoList';

export default {
	basicInfo,
	todoList
};

// Encode / Decode store states
export function encodeState(storeName, state) {
	//TODO, fix for ImmutableJS
	return JSON.stringify(state);
}

export function decodeState(storeName, data) {
	//TODO, fix for ImmutableJS
	return JSON.parse(data);
}
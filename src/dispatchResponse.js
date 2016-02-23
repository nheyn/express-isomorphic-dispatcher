/**
 * @flow
 */

type ResData = {
	newStates: {[key: string]: string}
};

/**
 * Encode the updated states, to send to the client.
 *
 * @param updatedStates	{StatesObject}				The updated states
 * @param encodeState	{(string, any) => string}	A function that will encode the state, of a given store, to be
 *													passed over an HTTP request
 *
 * @return				{ResData}					The data to respond to the client with
 */
export function encode(updatedStates: StatesObject, encodeState: EncodeStateFunc): ResData {
	const newStates = {};
	for(let storeName in updatedStates) {
		const updatedState = updatedStates[storeName];

		newStates[storeName] = encodeState(storeName, updatedState);
	}

	return { newStates };
}

/**
 * Decode the states from the server.
 *
 * @param response		{ResData}					The response form the server
 * @param decodeState	{(string, string) => any}	A function that will decode the state of a given store
 *
 * @return				{StatesObject}				The updated states
 */
export function decode(response: ResData, decodeState: DecodeStateFunc): StatesObject {
	const { newStates } = response;
	const updatedStates = {};
	for(let storeName in newStates) {
		const newState = newStates[storeName];

		updatedStates[storeName] = decodeState(storeName, newState);
	}

	return updatedStates;
}
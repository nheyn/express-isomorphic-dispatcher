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
	//TODO
	return {};
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
	//TODO
	return {};
}
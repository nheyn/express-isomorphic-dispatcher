/**
 * @flow
 */

type ReqData = {
	startingPoints: {[key: string]: { state: string, index: number }};
	actions: Array<Object>
};
type DecodedPause = { startingPoints: StartingPoints, actions: Array<Action> };

/**
 * Encodes the paused state of the dispatcher into json to be passed over an HTTP request.
 *
 * @oaram pausePoints	{StartingPoints}			The state and place the dispatcher was paused
 * @param actions		{Array<Actions>}			The actions to perform on the server
 * @param encodeState 	{(string, any) => string}	A function that will encode the state, of a given store, to be
 *													passed over an HTTP request
 *
 * @return				{ReqData}					The data to pass in the HTTP request
 */
export function encode(pausePoints: StartingPoints, actions: Array<Action>, encodeState: EncodeStateFunc): ReqData {
	// Encode pause points for sending over http
	let startingPoints = {};
	for(let storeName in pausePoints) {
		const { state, index } = pausePoints[storeName];
		const encodedState = encodeState(storeName, state);

		startingPoints[storeName] = { state: encodeState, index };
	}

	return { startingPoints, actions };
}

/**
 * Decodes the data into the starting points and actions to perform on the server.
 *
 * @param data			{ReqData}					The data from the client
 * @param decodeState	{(string, string) => any}	A function that will decode the state of a given store
 *
 * @return				{DecodePause}				The starting points and actions to start the dispatch from
 */
export function decode(data: ReqData, decodeState: DecodeStateFunc): DecodedPause {
	const { startingPoints: encodeStartingPoints, actions } = data;

	let startingPoints = {};
	for(let storeName in encodeStartingPoints) {
		const { state: encodeState, index } = encodeStartingPoints[storeName];
		const state = decodeState(storeName, encodeState);

		startingPoints[storeName] = { state, index };
	}

	return { startingPoints, actions };
}
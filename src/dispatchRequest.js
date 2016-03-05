/**
 * @flow
 */

type ReqData = {
  startingPoints: {[key: string]: { state: Json, index: number }};
  actions: Array<Object>
};
type DecodedPause = { startingPoints: StartingPoints, actions: Array<Action> };

/**
 * Encodes the paused state of the dispatcher into json to be passed over an HTTP request.
 *
 * @oaram pausePoints  {StartingPoints}      The state and place the dispatcher was paused
 * @param actions    {Array<Actions>}      The actions to perform on the server
 * @param encodeState   [{(string, any) => Json}]  A function that will encode the state, of a given store, to be
 *                          passed over an HTTP request
 *
 * @return        {ReqData}          The data to pass in the HTTP request
 */
export function encode(pausePoints: StartingPoints, actions: Array<Action>, encodeState?: EncodeStateFunc): ReqData {
  // Encode pause points for sending over http
  let startingPoints = {};
  for(let storeName in pausePoints) {
    const { state, index } = pausePoints[storeName];
    const encodedState = encodeState? encodeState(storeName, state): state;

    startingPoints[storeName] = { state: encodedState, index };
  }

  return { startingPoints, actions };
}

/**
 * Decodes the data into the starting points and actions to perform on the server.
 *
 * @param data      {ReqData}          The data from the client
 * @param decodeState  [{(string, Json) => any}]  A function that will decode the state of a given store
 *
 * @return        {DecodePause}        The starting points and actions to start the dispatch from
 */
export function decode(data: ReqData, decodeState?: DecodeStateFunc): DecodedPause {
  const { startingPoints: encodeStartingPoints, actions } = data;

  // Check inputs
  if(typeof encodeStartingPoints !== 'object') {
    throw new Error('Server dispatch requires startingPoints to be an object');
  }
  if(!actions || !Array.isArray(actions)) {
    throw new Error('Server dispatch requires actions to be an array');
  }

  let startingPoints = {};
  for(let storeName in encodeStartingPoints) {
    const { state: encodedState, index } = encodeStartingPoints[storeName];

    // Check input
    if(typeof index !== 'number') {
      throw new Error('Server dispatch requires startingPoint.index to be a number');
    }

    // Decode current state
    const state = decodeState? decodeState(storeName, encodedState): encodedState;
    startingPoints[storeName] = { state, index };
  }

  return { startingPoints, actions };
}
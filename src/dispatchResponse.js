/**
 * @flow
 */

type ResData = {
  newStates: {[key: string]: Json}
};

/**
 * Encode the updated states, to send to the client.
 *
 * @param updatedStates  {StatesObject}        The updated states
 * @param encodeState  [{(string, any) => Json}]  A function that will encode the state, of a given store, to be
 *                          passed over an HTTP request
 *
 * @return        {ResData}          The data to respond to the client with
 */
export function encode(updatedStates: StatesObject, encodeState?: EncodeStateFunc): ResData {
  const newStates = {};
  for(let storeName in updatedStates) {
    const updatedState = updatedStates[storeName];

    newStates[storeName] = encodeState? encodeState(storeName, updatedState): updatedState;
  }

  return { newStates };
}

/**
 * Decode the states from the server.
 *
 * @param response    {ResData}          The response form the server
 * @param decodeState  [{(string, Json) => any}]  A function that will decode the state of a given store
 *
 * @return        {StatesObject}        The updated states
 */
export function decode(response: ResData, decodeState?: DecodeStateFunc): StatesObject {
  const { newStates } = response;
  const updatedStates = {};
  for(let storeName in newStates) {
    const newState = newStates[storeName];

    updatedStates[storeName] = decodeState? decodeState(storeName, newState): newState;
  }

  return updatedStates;
}
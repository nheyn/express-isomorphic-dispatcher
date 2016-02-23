/**
 * @flow
 */

type ReqData = Object; //TODO
type DecodedPause = { startingPoints: StartingPoints, actions: Array<Action> };

/**
 * //TODO
 */
export function encode(pausePoints: StartingPoints, actions: Array<Action>, encodeState: EncodeStateFunc): ReqData {
	//TODO
	return {};
}

/**
 * //TODO
 */
export function decode(data: ReqData, decodeState: DecodeStateFunc): DecodedPause {
	//TODO
	return {
		startingPoints: {},
		actions: []
	};
}
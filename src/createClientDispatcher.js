/**
 * @flow
 */
import { createClientFactory } from 'isomorphic-dispatcher';

import { encode } from './dispatchRequest';
import { decode } from './dispatchResponse';
import sendXMLHttpRequest from './sendXMLHttpRequest';

const DEFAULT_PATH = 'dispatch';
const HTTP_METHOD = 'POST';

type ClientDispatcherSettings = Object; //TODO

export default function createClientDispatcher(stores: ClientDispatcherSettings, settings: Object): Dispatcher {
	const { path, encodeState, decodeState } = settings;
	const dispatcherFactory = createClientFactory(stores, (pausePoints, actions) => {
		// Send paused state to server
		const data = encode(pausePoints, actions, encodeState);
		const responsePromise = sendXMLHttpRequest(HTTP_METHOD, path? path: DEFAULT_PATH, data);

		// Update client for response
		return responsePromise.then((response) => {
			return decode(response, decodeState);
		});
	});

	return dispatcherFactory.getInitialDispatcher();
}
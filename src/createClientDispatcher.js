/**
 * @flow
 */
import { createClientFactory } from 'isomorphic-dispatcher';

import { DEFAULT_PATH, DEFAULT_ENCODE, DEFAULT_DECODE } from './defaults';
import { encode } from './dispatchRequest';
import { decode } from './dispatchResponse';
import sendXMLHttpRequest from './sendXMLHttpRequest';

type ClientDispatcherSettings = {
	path?: string,
	encodeState?: EncodeStateFunc,
	decodeState?: DecodeStateFunc
};

const HTTP_METHOD = 'POST';

/**
 * Create a Dispatcher for the Client, that is connected to an Express app's Server Dispatcher.
 *
 * @param stores 			{StoresObejct}
 * @param settings			{ServerDispatcherSettings}
 *
 * @return					{Dispatcher}
 */
export default function createClientDispatcher(stores: StoresObject, settings: ClientDispatcherSettings): Dispatcher {
	const { path, encodeState, decodeState } = settings;
	const dispatcherFactory = createClientFactory(stores, (pausePoints, actions) => {
		// Send paused state to server
		const data = encode(pausePoints, actions, encodeState? encodeState: DEFAULT_ENCODE);
		const responsePromise = sendXMLHttpRequest(HTTP_METHOD, path? path: DEFAULT_PATH, data);

		// Update client for response
		return responsePromise.then((response) => {
			return decode(response, decodeState? decodeState: DEFAULT_DECODE);
		});
	});

	return dispatcherFactory.getInitialDispatcher();
}
/**
 * @flow
 */
import { createClientFactory } from 'isomorphic-dispatcher';

import defaultSettings from './defaults';
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
export default function createClientDispatcher(
	stores: StoresObject,
	settings?: ClientDispatcherSettings = {}
): Dispatcher {
	const { path, encodeState, decodeState } = { ...defaultSettings, ...settings };
	const dispatcherFactory = createClientFactory(stores, (pausePoints, actions) => {
		// Send paused state to server
		const data = encode(pausePoints, actions, encodeState);
		const responsePromise = sendXMLHttpRequest(HTTP_METHOD, path, data);

		// Update client for response
		return responsePromise.then((response) => {
			return decode(response, decodeState);
		});
	});

	return dispatcherFactory.getInitialDispatcher();
}
/**
 * @flow
 */
import express from 'express';
import { createServerFactory } from 'isomorphic-dispatcher';

import defaultSettings from './defaults';
import { encode } from './dispatchResponse';
import { decode } from './dispatchRequest';
import sendXMLHttpRequest from './sendXMLHttpRequest';

type ServerDispatcherSettings = {
	path?: string,
	encodeState?: EncodeStateFunc,
	decodeState?: DecodeStateFunc
};

/**
 * Create an Express Router that can be used to handle Dispatches from a client. Also adds an isomorphic-dispatcher
 * DispatcherFactory to req.dispatch.
 *
 * @param stores 			{StoresObejct}					The initial stores to use in the dispatcher
 * @param settings			{ServerDispatcherSettings}		The settings to use to create the dispatcher
 * @param getOnServerArg	{(req: ExpressReq) => any}		A function that gets the value to pass the updaters
 *															function 'onServer' argument
 *
 * @return					{ExpressRouter}					The router to add to an Express app
 */
export default function serverDispatcherWith(
	stores: StoresObject,
	settings?: ServerDispatcherSettings = {},
	getOnServerArg?: (req: ExpressReq) => any
): ExpressRouter {
	const { path, encodeState, decodeState } = { ...defaultSettings, ...settings };

	let router = express.Router();
	router.use((req, res, next) => {
		req.dispatcher = createServerFactory(stores, { onServerArg: getOnServerArg? getOnServerArg(req): null });
		next();
	});
	router.post(path, (req, res, next) => {
		// Perform given actions on store
		const { startingPoints, actions } = decode(req.body, decodeState);
		const dispatcherPromise = req.dispatcher.getDispatcherAfter(startingPoints, actions);

		dispatcherPromise.then((dispatcher) => {
			// Get updated stores
			const updatedStoreNames = Object.keys(startingPoints);
			const updatedStates = dispatcher.getStateForAll().filter((_, storeName) => {
				return updatedStoreNames.includes(storeName);
			});

			// Send response
			const responseJson = encode(updatedStates, encodeState);
			res.send(responseJson);
		}).catch((err) => {
			next(err);
		});
	});

	return router;
}
/**
 * @flow
 */
import express from 'express';
import bodyParser from 'body-parser';
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
export default function connectServerDispatcher(
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
	router.use(path, bodyParser.json());
	router.post(path, (req, res, next) => {
		// Perform given actions on store
		const { actions, startingPoints } = decode(req.body, decodeState);

		const dispatcherPromise = req.dispatcher.getDispatcherAfter(actions, startingPoints);

		dispatcherPromise.then((dispatcher) => {
			// Get updated stores
			const updatedStoreNames = Object.keys(startingPoints);
			const newStates = dispatcher.getStateForAll();

			// Filter out stores not being dispatched on this request
			let updatedStates = {};
			for(let storeName in newStates) {
				if(updatedStoreNames.indexOf(storeName) !== -1) updatedStates[storeName] = newStates[storeName];
			}

			// Encode/Send response
			const responseJson = encode(updatedStates, encodeState);
			res.send(responseJson);
		}).catch((err) => {
			next(err);
		});
	});

	return router;
}
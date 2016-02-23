/**
 * @flow
 */
import express from 'express';
import { createServerFactory } from 'isomorphic-dispatcher';

import { encode } from './dispatchResponse';
import { decode } from './dispatchRequest';
import sendXMLHttpRequest from './sendXMLHttpRequest';

const DEFAULT_PATH = 'dispatch';

type ServerDispatcherSettings = Object; //TODO

export default function serverDispatcherWith(
	stores: StoresObject,
	settings: ServerDispatcherSettings,
	getOnServerArg: (req: ExpressReq, res: ExpressRes) => any
): ExpressRouter {
	const { path, encodeState, decodeState } = settings;

	let router = express.Router();
	router.use((req, res, next) => {
		req.dispatcher = createServerFactory(stores, { onServerArg: getOnServerArg(req, res) });
		next();
	});
	router.post(path? path: DEFAULT_PATH, (req, res, next) => {
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
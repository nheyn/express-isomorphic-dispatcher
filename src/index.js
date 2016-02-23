/**
 * @flow
 */
import express from 'express';
import { createClientFactory, createServerFactory } from 'isomorphic-dispatcher';

import * as dispatchRequest from './dispatchRequest';
import * as dispatchResponse from './dispatchResponse';
import sendXMLHttpRequest from './sendXMLHttpRequest';

const DEFAULT_PATH = 'dispatch';

type ServerDispatcherSettings = Object; //TODO

export function serverDispatcherWith(
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
		const { startingPoints, actions } = dispatchRequest.decode(req.body, decodeState);
		const dispatcherPromise = req.dispatcher.getDispatcherAfter(startingPoints, actions);

		dispatcherPromise.then((dispatcher) => {
			// Get updated stores
			const updatedStoreNames = Object.keys(pausedStates);
			const updatedStates = dispatcher.getStateForAll().filter((_, storeName) => {
				return pausedStates.includes(storeName);
			});

			// Send response
			const responseJson = dispatchResponse.encode(updatedStates, encodeState);
			res.send(responseJson);
		}).catch((err) => {
			next(err);
		});
	});

	return router;
}

type ClientDispatcherSettings = Object; //TODO

export function createClientDispatcher(stores: ClientDispatcherSettings, settings: Object): Dispatcher {
	const { path, encodeState, decodeState } = settings;
	const dispatcherFactory = createClientFactory(stores, {
		finishOnServer(pausePoints, actions) {
			// Send paused state to server
			const data = dispatchRequest.encode(pausePoints, actions, encodeState);
			const responsePromise = sendXMLHttpRequest(path? path: DEFAULT_PATH, data);

			// Update client for response
			return responsePromise.then((response) => {
				return dispatchResponse.decode(response, decodeState);
			});
		}
	});

	return dispatcherFactory.getInitialDispatcher();
}
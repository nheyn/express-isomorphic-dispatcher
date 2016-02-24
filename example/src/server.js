import React from 'react';
import ReactDOM from 'react-dom/server';
import express from 'express';
import { serverDispatcherWith } from 'express-isomorphic-dispatcher';

import App from './app';
import stores, { encode, decode } from './stores';


let app = express();
app.use((req, res, next) => {
	const { url, method, params, query } = req;
	console.log(`[${url}]: `, { method, params, query });
	next();
});
app.use(serverDispatcherWith(stores, { encode, decode }));
app.get('/', (req, res) => {
	const dispatcher = req.dispatcher.getInitialDispatcher();

	res.send(
		ReactDOM.renderToString(<App dispatcher={dispatcher} />)
	);
});
app.use((err, req, res, next) => {
	console.error(`[${req.url}] `, err);
	res.status(500).send(`[${err.name}] ${err.message}`);
});

app.listen(8080);
console.log('listening on 8080');
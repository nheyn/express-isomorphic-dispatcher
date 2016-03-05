import React from 'react';
import ReactDOM from 'react-dom/server';
import express from 'express';
import path from 'path';
import { connectDispatcher } from 'express-isomorphic-dispatcher';

import App from './components';
import stores, { encodeState, decodeState } from './stores';

let app = express();

// Log requests
app.use((req, res, next) => {
	const { url, method, params, query } = req;
	console.log(`[${url}]: `, { method, params, query });
	next();
});

// Add Dispatcher to app
app.use(connectDispatcher(stores, { encodeState, decodeState }));

// Server side react rendering
app.get('/', (req, res) => {
	const dispatcher = req.dispatcher.getInitialDispatcher();
	const reactHtml = ReactDOM.renderToString(<App dispatcher={dispatcher} />);

	res.send(
		ReactDOM.renderToStaticMarkup(
			<html>
				<head>
					<title>Express Isomorphic Dispatcher Example - Todo List</title>
				</head>
				<body>
					<div id="react-app" dangerouslySetInnerHTML={{ __html: reactHtml }} />
					<script src="/app.js" />
				</body>
			</html>
		)
	);
});

// Server javascript bundle
app.use('/app.js', express.static(path.join(__dirname, './app.js')));

// Log errors
app.use((err, req, res, next) => {
	console.error(`[${req.url}]: `, err.stack);
	res.status(500).send(`[${err.name}] ${err.message}`);
});

// Start server
app.listen(8080);
console.log('listening on 8080');
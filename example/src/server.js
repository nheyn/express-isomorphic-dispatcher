import React from 'react';
import ReactDOM from 'react-dom/server';
import express from 'express';
import path from 'path';
import { serverDispatcherWith } from 'express-isomorphic-dispatcher';

import App from './components';
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
app.use('/app.js', express.static(path.join(__dirname, '../app.js')));
app.use((err, req, res, next) => {
	console.error(`[${req.url}]: `, err.stack);
	res.status(500).send(`[${err.name}] ${err.message}`);
});

app.listen(8080);
console.log('listening on 8080');
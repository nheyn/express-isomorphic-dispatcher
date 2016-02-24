import React from 'react';
import ReactDOM from 'react-dom/server';
import express from 'express';
import { serverDispatcherWith } from 'express-isomorphic-dispatcher';

import App from './app';
import stores from './stores';


let app = express();
app.get('/'. (req, res) => {
	//TODO, add dispatcher
	res.send(
		ReactDOM.renderToString(<App />)
	);
});

app.listen(8080);
console.log('listening on 8080');
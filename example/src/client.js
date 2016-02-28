import React from 'react';
import ReactDOM from 'react-dom';
import { createClientDispatcher } from 'express-isomorphic-dispatcher';

import App from './App';
import stores, { encode, decode } from './stores';

// Enable react dev tools
window.React = React;

window.onload = () => {
	const dispatcher = createClientDispatcher(stores, { encode, decode });
	ReactDOM.render(<App dispatcher={dispatcher} />, window.document.getElementById('react-app'));
};
import React from 'react';
import ReactDOM from 'react-dom';
import { createClientDispatcher } from 'express-isomorphic-dispatcher';

import App from './app';
import stores from './stores';

// Enable react dev tools
window.React = React;

window.onload(() => {
	//TODO, add dispatcher
	ReactDOM.render(<App />, window.document.getElementById('react-app'));
});
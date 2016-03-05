import React from 'react';
import ReactDOM from 'react-dom';
import { createClientDispatcher } from 'express-isomorphic-dispatcher';

import App from './components';
import stores, { encodeState, decodeState } from './stores';

// Enable react dev tools
window.React = React;

window.onload = () => {
  const dispatcher = createClientDispatcher(stores, { encodeState, decodeState });
  ReactDOM.render(<App dispatcher={dispatcher} />, window.document.getElementById('react-app'));
};
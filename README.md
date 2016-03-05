# Express Isomorphic Dispatcher
*Express middlware that connects a client and server Isomorphic Dispatcher*

Basic express middleware that automatically connects a client and sever dispatcher, from [isomorphic-dispatcher](https://github.com/nheyn/isomorphic-dispatcher).

### Features
* A function that creates a dispatcher that sends the clients dispatches to the server, when 'onServer' is called
* A function to create the express middleware
	* Adds a DispatcherFactory to req object
	* Handles calls from the client side dispatcher, when 'onServer' is called

### Dependencies (from [isomorphic-dispatcher](https://github.com/nheyn/isomorphic-dispatcher))
* ES2015(ES6) Promises
	* Must include an ES2015 compatible Promises library, tested using [Babel polyfill](https://babeljs.io/docs/usage/polyfill/)

### Usage
##### Client
```
window.onload = function() {
	var dispatcher = createClientDispatcher(
		stores,					// The object with initial stores to use in the Dispatcher
		{
			path,				// The path to send 'onServer' dispatches to
			encodeState,		// A function that encodes the state of the stores before sending to the server
			decodeState			// A function that decodes the state of the stores from the server
		}
	);

	// Use dispatcher...
};
```

##### Server
```
var app = express();

app.use(connectDispatcher(
	stores,					// The object with initial stores to use in the Dispatcher
	{
		path,				// The path to get 'onServer' dispatches from
		decodeState,		// A function that decodes the state of the stores from the client
		encodeState			// A function that encodes the state of the stores before sending to the client
	}
));
```

### Documentation
Basic usage is given above. More detailed documentation is before class/function definitions within the code.

### Example
A basic site using express-react-router is in the /example/ directory.
To run using docker, run:
```
cd <path to repo>
docker build -t express-react-router:example .
docker build -d	-p <external port>:8080 express-react-router:example
```

### Plans
* Add more detailed usage to this document
* Cache each user's(session's) state on server, to minimize the size of the data passed to the server over ajax
* Only return changes to the state from the server, to minimize the size of the data returned from the server
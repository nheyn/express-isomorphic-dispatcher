/**
 * @flow
 */

/**
 * //TODO
 */
export default function sendXMLHttpRequest(method: 'GET' | 'POST', url: string, data: Object): Promise<Object> {
	return new Promise((resolve, reject) => {
		// Create Request
		let request = new XMLHttpRequest();

		// Handle Response
		request.onreadystatechange = () => {
			if(request.readyState !== 4) return;
			if(request.status !== 200) {
				reject(new Error(`Server Error:  Response Status ${request.status}`));
				return;
			}

			// Parse Response
			let responseJson = null;
			try {
				responseJson = JSON.parse(request.responseText);
			} catch(e) { }
			if(!responseJson) {
				reject(new Error('Invalid Json Format'));
				return;
			}

			// Return Response in Promise
			resolve(responseJson);
		};

		// Send Request as json
		request.open(method, url, true);
		request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
		request.send(JSON.stringify(data));
	});
}
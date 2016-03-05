/**
 * @flow
 */

/**
 * Create a promise that resolve to response to an http request.
 *
 *
 * @param method  {'GET' | 'POST'}  The http method to use
 * @param url    {string}      The url to send the http request to
 * @param data    {Object}      The object to send the server, sent as "application/json; charset=UTF-8"
 *
 * @return      {Promise<Object>}  A promise that resolve the http response
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
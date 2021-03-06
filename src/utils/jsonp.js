const baseUrl = 'https://api.flickr.com/services';
const onGoingRequests = {};
/**
 * Makes a request by adding a script tag to the body element with the src
 * attribute as the request url
 * @param  {String} url to request
 * @param  {String} callbackName name of callback in JSONP request
 */
export default function jsonp(url, callbackName) {
  var script = document.createElement('script');
  script.setAttribute('src', `${baseUrl}${url}&jsoncallback=${callbackName}`);
  // Clean up after script
  script.onload = function () {
    document.body.removeChild(script);
  };

  const promise = new Promise((resolve) => {
    global[callbackName] = function (data) {
      onGoingRequests[callbackName]--;
      if (onGoingRequests[callbackName] === 0) {
        delete onGoingRequests[callbackName];
      }
      // Clean up after callback, if we are the last call waiting
      if (onGoingRequests === 0) {
        delete global[callbackName];
      }
      resolve(data);
    };
  });

  // TODO: Should really clear ongoing requests as we are firing a new one to
  // override it. This will be fixed by not using jsonp
  if (onGoingRequests[callbackName] === undefined) {
    onGoingRequests[callbackName] = 0;
  }

  onGoingRequests[callbackName]++;
  document.body.appendChild(script);
  return promise;
}

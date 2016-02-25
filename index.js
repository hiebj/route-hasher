'use strict';
const url = require('url');

function factory(hashPrefix) {
  hashPrefix = hashPrefix || '';
  return (request, response, next) => {
    let requestUrl = url.parse(request.url);
    if (requestUrl.pathname !== '/') {
      response.writeHead(302, 'Found', {
        'Location': url.format(rewrite(requestUrl))
      });
      response.end();
    } else {
      next();
    }
  };

  function rewrite(url) {
    url.hash = `${hashPrefix}${url.pathname}`;
    url.pathname = '/';
    return url;
  }
}

module.exports = factory;

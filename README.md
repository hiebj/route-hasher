# route-hasher
[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][npm-url]

Middleware for [express][express-url] or [connect][connect-url] that redirects requests to the root path `/` with `url.pathname` written into `url.hash`.

Useful for single page apps with a client-side router e.g. [Angular][angular-url]. Since the server is unaware of UI routes outside of `/`, a direct request to a specific pathname such as `/users/hiebj` or `/account/orders` causes a naïve server to respond with `404 Not Found`. This middleware instead responds with `302 Found`, redirecting such a request to the root path with the route information stored in the URL's hash component:

```txt
GET /users/hiebj
-> 302 Found /#/users/hiebj
GET /account/orders
-> 302 Found /#/account/orders
GET /search?param1=val1&param2=val2
-> 302 Found /#/search?param1=val1&param2=val2
```

This way, the route information is handed off to the client-side router, which can use it to render the appropriate view.

## Usage

```js
const express = require('express'),
  hasher = require('route-hasher');

express()
  .use(hasher('!'))
  .use(express.static('.'))
  .listen(8080);
```

### Options

#### hashPrefix
`string`
A string to prepend to `url.pathname` before writing it into `url.hash`. For example, if `'!'` is used (as in the example), a request to `/users/hiebj` is redirected to `/#!/users/hiebj`.

[npm-image]: http://img.shields.io/npm/v/route-hasher.svg
[npm-url]: https://npmjs.org/package/route-hasher
[downloads-image]: http://img.shields.io/npm/dm/route-hasher.svg
[express-url]: https://github.com/expressjs/express
[connect-url]: https://github.com/senchalabs/connect
[angular-url]: https://angularjs.org/
[crawlable-url]: https://developers.google.com/webmasters/ajax-crawling/docs/getting-started

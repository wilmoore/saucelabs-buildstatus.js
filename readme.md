# saucelabs-buildstatus
> Retrieve sauce labs build status with dual error-first callback and Promise API.

[![Build Status](http://img.shields.io/travis/wilmoore/saucelabs-buildstatus.js.svg)](https://travis-ci.org/wilmoore/saucelabs-buildstatus.js) [![Code Climate](https://codeclimate.com/github/wilmoore/saucelabs-buildstatus.js/badges/gpa.svg)](https://codeclimate.com/github/wilmoore/saucelabs-buildstatus.js) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

```shell
npm install saucelabs-buildstatus --save
```

###### npm stats

[![npm](https://img.shields.io/npm/v/saucelabs-buildstatus.svg)](https://www.npmjs.org/package/saucelabs-buildstatus) [![NPM downloads](http://img.shields.io/npm/dm/saucelabs-buildstatus.svg)](https://www.npmjs.org/package/saucelabs-buildstatus) [![David](https://img.shields.io/david/wilmoore/saucelabs-buildstatus.js.svg)](https://david-dm.org/wilmoore/saucelabs-buildstatus.js)

## API Example

###### Build status 'passing'

```js
var status = require('saucelabs-buildstatus')

// error-first callback API
status(process.env.SAUCE_USERNAME, function (error, response) {
  console.log(response)
})
//=> { status: 'passing' }

// promise API
status(process.env.SAUCE_USERNAME)
  .then(console.log)
  .catch(console.error)
//=> { status: 'passing' }
```

###### Build status 'failed'

```js
var status = require('saucelabs-buildstatus')

// error-first callback API
status(process.env.SAUCE_USERNAME, function (error, response) {
  console.log(response)
})
//=> { status: 'failed' }

// promise API
status(process.env.SAUCE_USERNAME)
  .then(console.log)
  .catch(console.error)
//=> { status: 'failed' }
```

###### Build status 'unknown'

```js
var status = require('saucelabs-buildstatus')

// error-first callback API
status(process.env.SAUCE_USERNAME, function (error, response) {
  console.log(response)
})
//=> { status: 'unknown' }

// promise API
status(process.env.SAUCE_USERNAME)
  .then(console.log)
  .catch(console.error)
//=> { status: 'unknown' }
```

###### Error: Account not found

```js
// error-first callback API
status('n0000000000000p', function (error, response) {
  console.log(response)
})
//=> { status: 'error', error: 'Account not found' }

// promise API
status('n0000000000000p')
  .then(console.log)
  .catch(console.error)
//=> { status: 'error', error: 'Account not found' }
```

## API

### `status(sauceUsername)`

###### arguments

 - `sauceUsername (String)` Saucelabs user/project name.

###### returns

 - `(Object)` Status object.

## Reference

 - [Using Status Badges and the Browser Matrix Widget to Monitor Test Results]

## Contributing

> SEE: [contributing.md](contributing.md)

## Licenses

[![GitHub license](https://img.shields.io/github/license/wilmoore/saucelabs-buildstatus.js.svg)](https://github.com/wilmoore/saucelabs-buildstatus.js/blob/master/license)

[Using Status Badges and the Browser Matrix Widget to Monitor Test Results]: https://wiki.saucelabs.com/display/DOCS/Using+Status+Badges+and+the+Browser+Matrix+Widget+to+Monitor+Test+Results

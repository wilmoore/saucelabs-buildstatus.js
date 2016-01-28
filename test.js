'use strict'

/*!
 * imports.
 */

var nock = require('nock')
var read = require('fs').readFileSync
var test = require('tape-catch')

/*!
 * imports (local).
 */

var status = require('./')

/*!
 * fixtures.
 */

var fixtures = {
  failed: read('./test/fixtures/status-failed.045a47d1.png'),
  passing: read('./test/fixtures/status-passing.3a137816.png'),
  unknown: read('./test/fixtures/status-unknown.c21a5663.png')
}

/*!
 * parameters.
 */

var parameters = [
  { name: 'passing', status: 200, expected: { status: 'passing' } },
  { name: 'failed', status: 200, expected: { status: 'failed' } },
  { name: 'unknown', status: 200, expected: { status: 'unknown' } },
  { name: 'error', status: 404, expected: { error: 'Account not found', status: 'error' } }
]

/*!
 * tests.
 */

test('CPS API', function (t) {
  t.plan(parameters.length)

  parameters.forEach(function (p) {
    nock('https://saucelabs.com').get('/buildstatus/sauceUsername').reply(p.status, fixtures[p.name])
    status('sauceUsername', function (_, status) {
      t.deepEqual(status, p.expected, 'status-' + p.name)
    })
  })
})

test('Promise API', function (t) {
  t.plan(parameters.length)

  parameters.forEach(function (p) {
    nock('https://saucelabs.com').get('/buildstatus/sauceUsername').reply(p.status, fixtures[p.name])
    status('sauceUsername')
    .then(function (status) {
      t.deepEqual(status, p.expected, 'status-' + p.name)
    })
    .catch(function (_) {
      t.fail('failed: status-' + p.name)
    })
  })
})

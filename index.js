'use strict'

/*!
 * imports.
 */

var crypto = require('crypto')
var debug = require('debug')(require('./package.json').name)
var pify = require('pify')
var request = require('simple-get').concat
var promise = require('pinkie-promise')

/*!
 * exports.
 */

module.exports = buildstatus

/*!
 * status image hashes (base64 + md5 checksum).
 */

var statuses = {
  // https://wiki.saucelabs.com/download/attachments/48365687/status-passing.3a137816.png
  '06bd266db55036318e03b2aead95f679': 'passing',
  // https://wiki.saucelabs.com/download/attachments/48365687/status-failed.045a47d1.png
  'dbb5ac67de9505aa966534ba0fbb7dbb': 'failed',
  // https://wiki.saucelabs.com/download/attachments/48365687/status-unknown.c21a5663.png
  '840fa84f31aec9f208b6d3cf060370db': 'unknown'
}

/**
 * Returns the saucelabs build status for given project/user name.
 *
 * @param {String} sauceUsername
 * Saucelabs user/project name.
 *
 * @return {Object}
 * Status object.
 *
 * {
 *    "status": "passing|failed|unknown|error"
 * }
 */

function buildstatus (sauceUsername) {
  function thunk (cb) {
    request('https://saucelabs.com/buildstatus/' + sauceUsername, function (error, data, response) {
      debug('sauceUsername', sauceUsername)
      debug('error', error)
      return cb(null, status(base64md5(data), response.statusCode))
    })
  }

  if (typeof arguments[arguments.length - 1] === 'function') {
    return thunk(arguments[arguments.length - 1])
  } else {
    return pify(thunk, promise)()
  }
}

/**
 * Returns a status object given hash and response code.
 *
 * @param {String} hash
 * Hash of response body.
 *
 * @param {Number} code
 * Response code.
 *
 * @return {Object}
 * Status object.
 */

function status (hash, code) {
  debug('code', code)
  debug('hash', hash)

  var out = {
    status: statuses[hash] || 'error'
  }

  if (code === 404) {
    out.error = 'Account not found'
  }

  return out
}

/**
 * Calculates MD5 hash of base64 of given buffer.
 *
 * @param {Buffer} buffer
 * Buffer to hash.
 *
 * @return {Object}
 * MD5 hash of base64 of given buffer.
 */

function base64md5 (buffer) {
  return crypto.createHash('md5').update(buffer.toString('base64'), 'utf8').digest('hex')
}

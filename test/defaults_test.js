/*
 * grunt-aspnet-server
 * https://github.com/DavidRouyer/grunt-aspnet-server
 *
 * Copyright (c) 2014 David Rouyer
 * Licensed under the MIT license.
 */

'use strict';

var get = require('./lib/get');

module.exports.defaults = {
  test_server_not_running: function(test) {
    test.expect(1);

    try {
      get('http://localhost:3000/hello.txt', function(res, body) {
        throw new Error('Server should not be running yet');
      }, function(err) {
        test.equals('ECONNREFUSED', err.code);
        test.done();
      });
    } catch(e) {
      test.done();
    }
  }
};

/*
 * grunt-aspnet-server
 * https://github.com/DavidRouyer/grunt-aspnet-server
 *
 * Copyright (c) 2014 David Rouyer
 * Licensed under the MIT license.
 */

'use strict';

var get = require('./lib/get');

module.exports.custom_command = {
  test_custom_command: function(test) {
    test.expect(2);

    get('http://localhost:5002/fixtures/hello.txt', function(res, body) {
      test.equal(res.statusCode, 200, 'should return 200');
      test.equal(body, 'Howdy!\n', 'should return static page');
      test.done();
    }, function(err) {
      test.done();
    });
  }
};

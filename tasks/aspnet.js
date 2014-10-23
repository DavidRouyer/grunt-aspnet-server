/*
 * grunt-aspnet-server
 * https://github.com/DavidRouyer/grunt-aspnet-server
 *
 * Copyright (c) 2014 David Rouyer
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var servers = {};

  grunt.registerMultiTask('aspnet', 'Start an ASP.NET Server', function() {
    if (!servers[this.target]) {
      servers[this.target] = require('./lib/server')(grunt, this.target);
    }

    var server = servers[this.target];
    var action = this.args.shift() || 'start';

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      directory: '',
      url: 'http://localhost:3000',
      //4 available hosts : WebListener - Kestrel - CustomHost - Helios
      host: 'WebListener',
      //Configuration specified in project.json : debug - release...
      configuration: '',
      //Command speficied in project.json : web - run...
      command: '',
      opts: [ ],
      args: [ ],
      fallback: function() { /* Prevent EADDRINUSE from breaking Grunt */ },
      delay: 0,
      output: '.+'
    });

    server[action](options);
  });

};

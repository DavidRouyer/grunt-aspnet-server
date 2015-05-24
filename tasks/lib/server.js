/*
 * grunt-aspnet-server
 * https://github.com/DavidRouyer/grunt-aspnet-server
 *
 * Copyright (c) 2014 David Rouyer
 * Licensed under the MIT license.
 */

module.exports = function(grunt, target) {
  if (!process._servers) {
    process._servers = {};
  }

  var backup  = null;
  var done    = null;
  var server  = process._servers[target]; // Store server between live reloads to close/restart ASP.NET server

  var finished = function() {
    if (done) {
      done();

      done = null;
    }
  };

  return {
    start: function start(options) {
      if (server) {
        this.stop();

        if (grunt.task.current.flags.stop) {
          finished();

          return;
        }
      }

      backup = JSON.parse(JSON.stringify(process.env)); // Clone process.env

      // For some weird reason, on Windows the process.env stringify produces a "Path"
      // member instead of a "PATH" member, and grunt chokes when it can't find PATH.
      if (!backup.PATH) {
        if (backup.Path) {
          backup.PATH = backup.Path;
          delete backup.Path;
        }
      }

      grunt.log.writeln('Starting '.cyan + 'background ASP.NET server');

      done = grunt.task.current.async();

      options.cmd = 'dnx';

      var base_dir = process.cwd();

      //Launch server in subdirectory
      if (options.directory) {
        process.chdir(options.directory);
      }

      if (options.command) {
        options.args.unshift(options.command);
      }

      if (options.type && !options.command) {
        switch(options.type) {
          case 'console':
            options.args.unshift('run', 'server.urls=' + options.url);
            break;
          case 'web':
            options.args.unshift('web', '--server.urls', options.url);
            break;
          case 'kestrel':
            options.args.unshift('kestrel', '--server.urls', options.url);
            break;
        }
      }

      options.args.unshift('.');

      // Set configuration mode
      if (options.configuration) {
          options.opts.push('--configuration', options.configuration);
      }
      console.log(options.args);

      var donefunc = (options.delay || options.output) ?  function() {} : finished;
      server = process._servers[target] = grunt.util.spawn({
        cmd:      options.cmd,
        args:     options.opts.concat(options.args),
        env:      process.env,
        fallback: options.fallback
      }, donefunc);

      process.chdir(base_dir);

      if(server === undefined) {
        grunt.fail.fatal('dnx runtime is missing! Installation instructions are available here: https://github.com/aspnet/home', 1);
      }

      if (options.delay) {
        setTimeout(finished, options.delay);
      }

      if (options.output) {
        server.stdout.on('data', function(data) {
          var message = "" + data;
          var regex = new RegExp(options.output, "gi");
          if (message.match(regex)) {
            finished();
          }
        });
      }
      server.stderr.on('data', function(data) {
        finished();
      });
      server.stdout.pipe(process.stdout);
      server.stderr.pipe(process.stderr);

      process.on('exit', finished);
      process.on('exit', this.stop);
    },

    stop: function stop() {
      if (server && server.kill) {
        grunt.log.writeln('Stopping'.red + ' ASP.NET server');

        server.kill('SIGTERM');
        process.removeListener('exit', finished);
        process.removeListener('exit', stop);
        server = process._servers[target] = null;
      }

      // Restore original process.env
      if (backup) {
        process.env = JSON.parse(JSON.stringify(backup));
      }

      finished();
    }
  };
};

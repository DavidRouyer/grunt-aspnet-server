/*
 * grunt-aspnet-server
 * https://github.com/DavidRouyer/grunt-aspnet-server
 *
 * Copyright (c) 2014 David Rouyer
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/**/*.js',
        'test/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    watch: {
      aspnet: {
        options: {
          livereload: true,
          spawn: false
        },
        files: [
          'Gruntfile.js',
          'tasks/**/*.js',
          'test/**/*.js'
        ],
        tasks: ['aspnet:defaults']
      }
    },

    // Unit tests.
    nodeunit: {
      defaults: {
        src: 'test/defaults_test.js'
      },
      custom_url: {
        src: 'test/custom_url_test.js'
      },
      custom_delay: {
        src: 'test/custom_delay_test.js'
      },
      custom_command: {
        src: 'test/custom_command_test.js'
      }
    },

    aspnet: {
      options: {
        url: 'http://localhost:3000'
      },
      defaults: {},
      custom_url: {
        options: {
          directory: 'test',
          url: 'http://localhost:8080'
        }
      },
      custom_delay: {
        options: {
          directory: 'test',
          delay: 5000
        }
      },
      custom_command: {
        options: {
          directory: 'test',
          command: 'web'
        }
      }
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean',
    'aspnet:defaults', 'nodeunit:defaults', 'aspnet:defaults:stop',
    'aspnet:custom_url', 'nodeunit:custom_url', 'aspnet:custom_url:stop',
    'aspnet:custom_delay', 'nodeunit:custom_delay', 'aspnet:custom_delay:stop',
    'aspnet:custom_command', 'nodeunit:custom_command', 'aspnet:custom_command:stop'
  ]);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};

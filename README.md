# grunt-aspnet-server

> Grunt task for running an ASP.NET Server

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-aspnet-server --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-aspnet-server');
```

## The "aspnet" task

### Setup
In your project's Gruntfile, add a section named `aspnet` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  aspnet: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

#### Default Options

```js
grunt.initConfig({
  aspnet: {
    options: {
      //Launch ASP.NET server from subfolder
      directory: '',

      //Override default URL
      url: 'http://localhost:3000',

      //Override default type. DNX have 3 different types : console - kestrel - web
      type: 'web',

      //Specify configuration specified in project.json : debug - release...
      configuration: '',

      //Command specified in project.json : web - run...
      command: '',

      // Will turn into: `k [command] ARG1 ARG2 ... ARGN`
      args: [ ],

      // Consider the server to be "running" after an explicit delay (in milliseconds)
      delay: 0
    }
  },
});
```

### Usage

By default, **the server is considered "running" once any output is logged to the console**,
upon which control is passed back to grunt.

Typically, this is normally:

> Started

#### Starting the server

If you have a server defined named `dev`, you can start the server by running `aspnet:dev`. The server only runs as long as grunt is running. Once grunt's tasks have completed, the web server stops.

#### Stopping the server

Similarly, if you start the `dev` server with `aspnet:dev`, you can stop the server
with `aspnet:dev:stop`.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

- v0.2.0 - Switch from k command to dnx
- v0.1.0 - Initial release

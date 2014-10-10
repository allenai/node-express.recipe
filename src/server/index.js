var express = require('express');
var griddle = require('griddle');
var path = require('path');
var q = require('q');

const CLIENT = path.resolve(__dirname, '../client');
const CLIENT_SRC = path.resolve(__dirname, '../client/src');
const BUILD = path.resolve(__dirname, '../../build');
const DEFAULT_PORT = 4000;

var app = express();
app.use(griddle(CLIENT, CLIENT_SRC));
app.use(express.static(BUILD));

var server;

module.exports = {
  start: function(port) {
    var listening = q.defer();
    if(typeof port !== 'number') {
      port = DEFAULT_PORT;
    }
    try {
      server = app.listen(port, function() {
        listening.resolve('HTTP Server Listening on ' + port);
      });
    } catch(e) {
      listening.reject(e);
    }
    return listening.promise;
  },
  stop: function() {
    var stopped = q.defer();
    if(server) {
      try {
        server.close(function() {
          stopped.resolve();
        });
      } catch(e) {
        stopped.reject(e);
      }
    }
    return stopped.promise;
  },
  restart: function(port) {
    return this.stop().then(function() {
      return this.start(port);
    });
  }
};

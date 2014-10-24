'use strict';

var page   = require('webpage').create();
var fs     = require('fs');
var system = require('system');

var pledgesPath  = system.args[1];
var projectorUrl = system.args[2];

console.log('Starting...');

page.open(projectorUrl, function () {
  var stream = fs.open(pledgesPath, 'r');

  var pledges = '';
  while (!stream.atEnd()) {
    pledges += stream.readLine();
  }
  stream.close();

  phantom.exit();
});

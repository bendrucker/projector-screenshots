'use strict';

var path         = require('path');
var childProcess = require('child_process');
var phantomjs    = require('phantomjs');

childProcess.spawn(phantomjs.path, [
  path.join(__dirname, 'script.js'),
  process.env.PLEDGES_PATH,
  process.env.PROJECTOR_URL
],
{
  stdio: 'inherit'
});

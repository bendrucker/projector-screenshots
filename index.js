'use strict';

var Promise   = require('bluebird');
var wd        = require('wd');
var asserters = wd.asserters;
var browser   = wd.promiseChainRemote();

Promise
  .resolve(require(process.env.PLEDGES_PATH))
  .tap(function () {
    return browser
      .init({browserName: 'chrome'})
      .setWindowSize(1440, 900)
      .get(process.env.PROJECTOR_URL)
      .waitForElementByCss('.loading-indicator', asserters.isNotDisplayed, 5000);
  })
  .bind(browser)
  .finally(browser.quit);


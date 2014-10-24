'use strict';

var Promise    = require('bluebird');
var changeCase = require('change-case');
var wd         = require('wd');
var asserters  = wd.asserters;
var browser    = wd.promiseChainRemote();

Promise
  .resolve(require(process.env.PLEDGES_PATH))
  .tap(function () {
    return browser
      .init({browserName: 'chrome'})
      .setWindowSize(1440, 900)
      .get(process.env.PROJECTOR_URL)
      .waitForElementByCss('.loading-indicator', asserters.isNotDisplayed, 5000)
      .safeExecute("document.querySelector('.go-fullscreen').remove()")
  })
  .tap(function () {
    var replacements = ['Allie Kunzig', 'John Fitzpatrick', 'Donna Grogan', 'Diana Gray'];
    var nodeLookup = "document.querySelectorAll('.donor-list-name')";
    return Promise.resolve(browser
      .safeEval(nodeLookup))
      .then(function (nameNodes) {
        return [].slice.call(nameNodes, 1, nameNodes.length);
      })
      .each(function (node, index) {
        return browser.safeEval(nodeLookup + '[' + (index + 1) + '].textContent = ' + '"' + replacements[index] + '"');
      });
  })
  .map(function (pledge) {
    var donor = pledge.donor.name;
    return browser
      .safeExecute("document.querySelector('.donor-list-name').textContent = '" + donor + "'")
      .saveScreenshot('./screenshots/' + changeCase.paramCase(donor) + '.png');
  },
  {
    concurrency: 1
  })
  .bind(browser)
  .finally(browser.quit);


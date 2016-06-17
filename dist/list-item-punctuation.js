'use strict';

var visit = require('unist-util-visit');
var toString = require('mdast-util-to-string');
var end = require('mdast-util-position').end;
var defaults = require('object.defaults');
var endingCondition = require('./ending-condition.js').endingCondition;

function findEnding(endings, text) {
  return endings.find(function (x) {
    return endingCondition(x, text);
  });
}

function endingCheck(ast, file, preferred, done) {
  var defaultSettings = {
    // Basic settings:
    endings: ['.'],
    finalEndings: [],

    // Loose lists:
    looseEndings: []
  };
  var settings = preferred || {};

  // Merging the default and actual values:
  defaults(settings, defaultSettings);

  visit(ast, 'list', function (node) {
    for (var i = 0; i < node.children.length; i++) {
      var listItem = node.children[i];

      // If list is loose check list line, otherwise check first line
      var item = node.loose ? listItem.children[listItem.children.length - 1] : listItem.children[0];
      var text = toString(item).trim();

      var _end = end(item);

      var line = _end.line;
      var column = _end.column;

      var endings = [];

      if (node.loose && settings.looseEndings.length) {
        endings = settings.looseEndings;
      } else {
        var isFinal = i === node.children.length - 1 && settings.finalEndings.length > 0;

        endings = isFinal ? settings.finalEndings : settings.endings;
      }

      if (!findEnding(endings, text)) {
        file.warn('List items have to end up with "' + endings.join(' ') + '"', { line: line, column: column });
      }
    }
  });
  done();
}

module.exports = {
  'list-item-punctuation': endingCheck
};
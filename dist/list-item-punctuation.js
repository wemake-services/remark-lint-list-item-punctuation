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
    final_endings: [],

    // Loose lists:
    loose: {
      endings: ['.'],
      final_endings: []
    }
  };
  var settings = preferred || {};
  defaults(settings, defaultSettings);

  visit(ast, 'list', function (node) {
    for (var i = 0; i < node.children.length; i++) {
      var item = node.children[i].children[0];
      var text = toString(item).trim();

      var _end = end(item);

      var line = _end.line;
      var column = _end.column;

      var endings = i === node.children.length - 1 && settings.final_endings.length > 0 ? settings.final_endings : settings.endings;
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
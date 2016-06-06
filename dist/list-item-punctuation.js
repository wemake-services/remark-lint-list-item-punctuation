'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var visit = require('unist-util-visit');
var toString = require('mdast-util-to-string');
var end = require('mdast-util-position').end;

function endingCheck(ast, file, preferred, done) {
  var endings = ['.'];
  if ((typeof preferred === 'undefined' ? 'undefined' : _typeof(preferred)) === 'object' && preferred.endings) {
    endings = preferred.endings;
  }

  visit(ast, 'listItem', function (node) {
    var item = node.children[0];
    var text = toString(item).trim();

    var _end = end(item);

    var line = _end.line;
    var column = _end.column;


    if (!endings.find(function (x) {
      return x === text.substring(text.length - x.length);
    })) {
      file.warn('List items have to end up with "' + endings.join(' ') + '"', { line: line, column: column });
    }
  });
  done();
}

module.exports = {
  'list-item-punctuation': endingCheck
};
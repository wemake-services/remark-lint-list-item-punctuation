'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var visit = require('unist-util-visit');
var toString = require('mdast-util-to-string');

function endingCheck(ast, file, preferred, done) {
  var endings = ['.'];
  if ((typeof preferred === 'undefined' ? 'undefined' : _typeof(preferred)) === 'object' && !('length' in preferred)) {
    endings = preferred.ending;
  }

  visit(ast, 'listItem', function (node) {
    var text = toString(node.children[0].children[0]).trim();
    var ch = text.substring(text.length - 1);
    if (!endings.find(function (x) {
      return x === ch;
    })) {
      file.warn('List items have to end up with "' + endings.join(' ') + '": ' + text, node);
    }
  });
  done();
}

module.exports = {
  'ending-period': endingCheck
};
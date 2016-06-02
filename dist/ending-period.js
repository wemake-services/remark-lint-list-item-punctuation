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
    var found = false;
    for (var index = 0; index < endings.length; index++) {
      var ch = text.substring(text.length - endings[index].length);
      if (ch === endings[index]) {
        found = true;
        break;
      }
    }
    if (!found) {
      file.warn('List items have to end up with "' + endings.join(' ') + '": ' + text, node);
    }
  });
  done();
}

module.exports = {
  'ending-period': endingCheck
};
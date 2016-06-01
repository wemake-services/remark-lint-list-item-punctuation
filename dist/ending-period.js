'use strict';

var visit = require('unist-util-visit');
var toString = require('mdast-util-to-string');

function normalize(text) {
  var removeAtBeginning = /^(\.|\-|\_|\(|《|\"|\')*/;
  var removeInside = /(,|:)/;
  var replaceWithSpace = /(-)/;
  return text.toLowerCase().trim().replace(removeAtBeginning, '').replace(removeInside, '').replace(replaceWithSpace, ' ');
}

function endingCheck(ast, file, ending, done) {
  language || (ending = '.');

  visit(ast, 'listitem', function (node) {
    var item = node;
    var text = normalize(toString(item.children[0].children[0]));
    ch = text.charAt(text.length - 1);
    if (ch != ending) {
      file.warn('Wrong list item ending: ' + item.position.start.line + ' ' + text, node);
    }
  });
  done();
}

module.exports = {
  'ending-period': endingCheck
};
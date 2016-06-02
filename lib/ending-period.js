const visit = require('unist-util-visit');
const toString = require('mdast-util-to-string');

function endingCheck(ast, file, preferred, done) {
  let ending = '.';
  if (typeof preferred === 'object' && !('length' in preferred)) {
    ending = preferred.ending;
  }

  visit(ast, 'listItem', (node) => {
    const text = toString(node.children[0].children[0]).trim();
    const ch = text.substring(text.length - ending.length);
    if (ch !== ending) {
      file.warn('List items have to end up with "' + ending + '": ' + text, node);
    }
  });
  done();
}

module.exports = {
  'ending-period': endingCheck,
};

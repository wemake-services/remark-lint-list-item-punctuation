const visit = require('unist-util-visit');
const toString = require('mdast-util-to-string');

function endingCheck(ast, file, preferred, done) {
  let endings = ['.'];
  if (typeof preferred === 'object' && !('length' in preferred)) {
    endings = preferred.ending;
  }

  visit(ast, 'listItem', (node) => {
    const text = toString(node.children[0].children[0]).trim();
    let found = false;
    for (let index = 0; index < endings.length; index++) {
      const ch = text.substring(text.length - endings[index].length);
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
  'ending-period': endingCheck,
};

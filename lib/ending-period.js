const visit = require('unist-util-visit');
const toString = require('mdast-util-to-string');

function endingCheck(ast, file, preferred, done) {
  let endings = ['.'];
  if (typeof preferred === 'object' && preferred.endings) {
    endings = preferred.endings;
  }

  visit(ast, 'listItem', (node) => {
    const text = toString(node.children[0]).trim();
    if (!endings.find(x => x === text.substring(text.length - x.length))) {
      file.warn(`List items have to end up with "${endings.join(' ')}"`, file.offsetToPosition(file.positionToOffset(node.position.end)));
    }
  });
  done();
}

module.exports = {
  'ending-period': endingCheck,
};

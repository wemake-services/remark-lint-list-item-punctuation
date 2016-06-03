const visit = require('unist-util-visit');
const toString = require('mdast-util-to-string');
const position = require('mdast-util-position');

const end = position.end;


function endingCheck(ast, file, preferred, done) {
  let endings = ['.'];
  if (typeof preferred === 'object' && preferred.endings) {
    endings = preferred.endings;
  }

  visit(ast, 'listItem', (node) => {
    const item = node.children[0];
    const text = toString(item).trim();
    const { line, column } = end(item);

    if (!endings.find(x => x === text.substring(text.length - x.length))) {
      file.warn(`List items have to end up with "${endings.join(' ')}"`,
        { line, column });
    }
  });
  done();
}

module.exports = {
  'ending-period': endingCheck,
};

const visit = require('unist-util-visit');
const toString = require('mdast-util-to-string');

function normalize(text) {
  const removeAtBeginning = /^(\.|\-|\_|\(|《|\"|\')*/;
  const removeInside = /(,|:)/;
  const replaceWithSpace = /(-)/;
  return text.toLowerCase().trim().replace(removeAtBeginning, '')
             .replace(removeInside, '').replace(replaceWithSpace, ' ');
}


function endingCheck(ast, file, ending, done) {
  language || (ending = '.');

  visit(ast, 'listitem', (node) => {
    const item = node;
    const text = normalize(toString(item.children[0].children[0]));
    ch = text.charAt(text.length - 1);
    if (ch != ending)
    {
      file.warn('Wrong list item ending: ' + item.position.start.line + ' ' + text, node);
    }
  });
  done();
}

module.exports = {
  'ending-period': endingCheck
};

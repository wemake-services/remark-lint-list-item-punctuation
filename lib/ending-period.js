const visit = require('unist-util-visit');
const toString = require('mdast-util-to-string');

function normalize(text) {
  const removeAtBeginning = /^(\.|\-|\_|\(|《|\"|\')*/;
  const removeInside = /(,|:)/;
  const replaceWithSpace = /(-)/;
  return text.toLowerCase().trim().replace(removeAtBeginning, '')
             .replace(removeInside, '').replace(replaceWithSpace, ' ');
}


function endingCheck(ast, file, preferred, done) {
  var ending = '.'
  if (typeof preferred === 'object' && !('length' in preferred)) {
    ending = preferred.ending;
  }

  visit(ast, 'listItem', (node) => {
    const item = node;
    const text = toString(item.children[0].children[0]);
    var ch = text.substring(text.length - ending.length);
    if (ch != ending)
    {
      file.warn('List items have to end up with "' + ending + '": ' + text, node);
    }
  });
  done();
}

module.exports = {
  'ending-period': endingCheck
};

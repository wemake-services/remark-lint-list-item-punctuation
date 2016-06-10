const visit = require('unist-util-visit');
const toString = require('mdast-util-to-string');
const end = require('mdast-util-position').end;
const defaults = require('object.defaults');
const endingCondition = require('./ending-condition.js').endingCondition;

function findEnding(endings, text) {
  return endings.find(x => endingCondition(x, text));
}

function endingCheck(ast, file, preferred, done) {
  const defaultSettings = {
    // Basic settings:
    endings: ['.'],
    final_endings: [],

    // Loose lists:
    loose_endings: [],
  };
  const settings = preferred || {};
  defaults(settings, defaultSettings);

  visit(ast, 'list', node => {
    for (let i = 0; i < node.children.length; i++) {
      const listItem = node.children[i];
      const item = node.loose ? listItem.children[listItem.children.length - 1]
        : listItem.children[0];
      const text = toString(item).trim();
      const { line, column } = end(item);
      let endings = [];
      if (node.loose && settings.loose_endings.length > 0) {
        endings = settings.loose_endings;
      } else {
        endings = i === node.children.length - 1
          && settings.final_endings.length > 0 ?
          settings.final_endings : settings.endings;
      }

      if (!findEnding(endings, text)) {
        file.warn(`List items have to end up with "${endings.join(' ')}"`,
          { line, column }
        );
      }
    }
  });
  done();
}

module.exports = {
  'list-item-punctuation': endingCheck,
};

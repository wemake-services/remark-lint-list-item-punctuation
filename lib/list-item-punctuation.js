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
    finalEndings: [],

    // Loose lists:
    looseEndings: [],
  };
  const settings = preferred || {};

  // Merging the default and actual values:
  defaults(settings, defaultSettings);

  visit(ast, 'list', node => {
    for (let i = 0; i < node.children.length; i++) {
      const listItem = node.children[i];

      // If list is loose check list line, otherwise check first line
      const item = node.loose ? listItem.children[listItem.children.length - 1]
        : listItem.children[0];
      const text = toString(item).trim();
      const { line, column } = end(item);
      let endings = [];

      if (node.loose && settings.looseEndings.length) {
        endings = settings.looseEndings;
      } else {
        const isFinal = i === node.children.length - 1
          && settings.finalEndings.length > 0;

        endings = isFinal ? settings.finalEndings : settings.endings;
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

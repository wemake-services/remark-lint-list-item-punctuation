const visit = require('unist-util-visit');
const toString = require('mdast-util-to-string');
const end = require('mdast-util-position').end;
const defaults = require('object.defaults');

function endingTry(ending, text) {
  if (ending === '') {
    return /\w$/.test(text);
  }

  return ending === text.substring(text.length - ending.length);
}

function endingCheck(ast, file, preferred, done) {
  const defaultSettings = {
    // Basic settings:
    endings: ['.'],
    final_endings: [],

    // Loose lists:
    loose: {
      endings: ['.'],
      final_endings: [],
    },
  };
  const settings = preferred || {};
  defaults(settings, defaultSettings);

  visit(ast, 'list', node => {
    for (let i = 0; i < node.children.length; i++) {
      const item = node.children[i].children[0];
      const text = toString(item).trim();
      const { line, column } = end(item);
      const endings = i === node.children.length - 1 &&
        settings.final_endings.length > 0 ? settings.final_endings :
        settings.endings;
      if (!endings.find(x => endingTry(x, text))) {
        file.warn(`List items have to end up with "${endings.join(' ')}"`,
          { line, column });
      }
    }
  });
  done();
}

module.exports = {
  'list-item-punctuation': endingCheck,
};

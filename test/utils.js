const assert = require('assert');
const fs = require('fs');
const remark = require('remark');
const lintPlugin = require('remark-lint');
const path = require('path');
const endingCondition = require('../dist/endingCondition.js').endingCondition;

function createProccessor(endings) {
  const pluginOptions = {
    external: ['../dist/list-item-punctuation.js'],
  };

  if (endings !== undefined) {
    pluginOptions['list-item-punctuation'] = { endings };
  }

  return remark().use(lintPlugin, pluginOptions);
}

function assertionCallback(err, file, warnings, done) {
  if (err) { throw err; }

  // actual, expected
  assert.deepEqual(warnings, file.messages);
  done();
}

function loadWarnings(fixtureName) {
  return require(path.join(__dirname, fixtureName, 'expected.js'));
}

function loadFixture(fixtureName) {
  return fs.readFileSync(
    path.join(__dirname, fixtureName, 'file.md')
  ).toString();
}

function createMessage(line, column, endings) {
  return {
    name: line + ':' + column,
    file: '',
    message: `List items have to end up with "${endings.join(' ')}"`,
    reason: `List items have to end up with "${endings.join(' ')}"`,
    line,
    column,
    location: {
      start: { line, column },
      end: { line: null, column: null },
    },
    fatal: false,
    ruleId: 'list-item-punctuation',
    source: 'remark-lint',
  };
}

function assertWarningsLength(fixtureName, warnings, done, endings) {
  const processor = createProccessor(endings);

  processor.process(
    loadFixture(fixtureName),
    (err, file) => assertionCallback(err, file, warnings, done)
  );
}

function assertCondition(ending, text, result, done) {
  assert.deepEqual(endingCondition(ending, text), result);
  done();
}

module.exports = { createMessage, assertWarningsLength, loadWarnings, assertCondition };

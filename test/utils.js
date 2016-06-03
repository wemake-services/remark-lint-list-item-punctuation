const assert = require('assert');
const fs = require('fs');
const remark = require('remark');
const lintPlugin = require('remark-lint');
const path = require('path');


function createProccessor(endings) {
  const pluginOptions = {
    external: ['../dist/ending-period.js'],
  };

  if (endings !== undefined) {
    pluginOptions['ending-period'] = { endings };
  }

  return remark().use(lintPlugin, pluginOptions);
}


function assertionCallback(err, file, warnings, done) {
  if (err) { throw err; }
  assert.deepEqual(file.messages, warnings);
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
    ruleId: 'ending-period',
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

module.exports = { createMessage, assertWarningsLength, loadWarnings };

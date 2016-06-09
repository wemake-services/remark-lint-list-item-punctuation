/* global describe it */

const utils = require('./utils');

// Test cases:

describe('No list items situation', () => {
  const warnings = utils.loadWarnings('no_list');

  it(`Expect ${warnings.length} warning(s) from list-item-punctuation`, done => {
    utils.assertWarningsLength('no_list', warnings, done);
  });
});

describe('Testing plugin with default settings', () => {
  const warnings = utils.loadWarnings('default_endings');

  it(`Expect ${warnings.length} warning(s) from list-item-punctuation`, done => {
    utils.assertWarningsLength('default_endings', warnings, done);
  });
});

describe('Testing plugin with overridden endings', () => {
  const warnings = utils.loadWarnings('custom_endings');

  it(`Expect ${warnings.length} warning(s) from list-item-punctuation`, done => {
    utils.assertWarningsLength(
      'custom_endings', warnings, done, ['.', ',', '!?']
    );
  });
});

describe('Testing ending check condition with "." ending', () => {
  it('Expect false on "Test text"', done => {
    utils.assertCondition('.', 'Test text', false, done);
  });

  it('Expect true on "Test text."', done => {
    utils.assertCondition('.', 'Test text.', true, done);
  });
});

describe('Testing ending check condition with no ending', () => {
  it('Expect false on "Test text!"', done => {
    utils.assertCondition('', 'Test text!', false, done);
  });

  it('Expect true on "Test text"', done => {
    utils.assertCondition('', 'Test text', true, done);
  });
});

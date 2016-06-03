var assert = require('assert');
var fs = require('fs');
var remark = require('remark');
var lintPlugin = require('remark-lint');
var path = require('path');

var directories = fs.readdirSync(__dirname).filter(function(file) {
  return fs.statSync(path.join(__dirname, file)).isDirectory();
});

describe("No list",function() {
  var warnings = require(path.join(__dirname, "no_list", 'expected.js'));
  it(`Expect ${warnings.length} warning(s) from ending-period`, function (done) {
    var pluginOptions = {
        external: ['../dist/ending-period.js']
      };
    var processor = remark().use(lintPlugin, pluginOptions);

      processor.process(
        fs.readFileSync(path.join(__dirname, "no_list", 'file.md')).toString(),
        function (err, file) {
          if (err) {
            throw err;
          }
          assert.deepEqual(
            file.messages,
            warnings
          );
          done();
        }
      );
  });
});

describe("Default endings",function() {
  var warnings = require(path.join(__dirname, "default_endings", 'expected.js'));
  it(`Expect ${warnings.length} warning(s) from ending-period`, function (done) {
    var pluginOptions = {
        external: ['../dist/ending-period.js']
      };
    var processor = remark().use(lintPlugin, pluginOptions);

      processor.process(
        fs.readFileSync(path.join(__dirname, "default_endings", 'file.md')).toString(),
        function (err, file) {
          if (err) {
            throw err;
          }
          assert.deepEqual(
            file.messages,
            warnings
          );
          done();
        }
      );
  });
});

describe("Custom endings",function() {
  var warnings = require(path.join(__dirname, "custom_endings", 'expected.js'));
  it(`Expect ${warnings.length} warning(s) from ending-period`, function (done) {
    var pluginOptions = {
        external: ['../dist/ending-period.js'],
        'ending-period': {
          endings: ['.', ',', "!?"]
        }
      };
    var processor = remark().use(lintPlugin, pluginOptions);

      processor.process(
        fs.readFileSync(path.join(__dirname, "custom_endings", 'file.md')).toString(),
        function (err, file) {
          if (err) {
            throw err;
          }
          assert.deepEqual(
            file.messages,
            warnings
          );
          done();
        }
      );
  });
});

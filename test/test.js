var assert = require('assert');
var fs = require('fs');
var remark = require('remark');
var lintPlugin = require('remark-lint');
var path = require('path');

var directories = fs.readdirSync(__dirname).filter(function(file) {
  return fs.statSync(path.join(__dirname, file)).isDirectory();
});

directories.forEach(function (dir) { 

  describe((dir[0].toUpperCase() + dir.slice(1)).replace("_"," "), function () {

    it(dir, function (done) {

      // Deliberately diversifying our plugin options to increase branch
      // coverage.
      var pluginOptions = {
        external: ['../dist/ending-period.js']
      };
      if (dir === 'custom_endings') {
        pluginOptions['ending-period'] = {
          endings: ['.', ',', "!?"]
        };
      }

      var processor = remark().use(lintPlugin, pluginOptions);

      processor.process(
        fs.readFileSync(path.join(__dirname, dir, 'file.md')).toString(),
        function (err, file) {
          if (err) {
            throw err;
          }
          assert.deepEqual(
            file.messages,
            require(path.join(__dirname, dir, 'expected.js'))
          );
          done();
        }
      );

    });

  })

});

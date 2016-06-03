module.exports = function createMessage(line, column, endings) {
  return {
    name: line + ':' + column,
    file: '',
    message: `List items have to end up with "${endings.join(' ')}"`,
    reason: `List items have to end up with "${endings.join(' ')}"`,
    line: line,
    column: column,
    location: {
      start: {line: line, column: column},
      end: {line: null, column: null}
    },
    fatal: false,
    ruleId: "ending-period",
    source: "remark-lint"
  };
};

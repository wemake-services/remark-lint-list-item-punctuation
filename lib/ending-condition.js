function endingCondition(ending, text) {
  if (ending === '') {
    return /\w$/.test(text);
  }

  return ending === text.substring(text.length - ending.length);
}

module.exports = { endingCondition };

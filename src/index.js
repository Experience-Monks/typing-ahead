const DataModel = require('./model/');

/**
 * Add words to the model
 * @param {string} words - word to be added to the model
 */
function generate(words) {
  return new DataModel().addBatch(words);
}

/**
 * Get all matching suffix
 * @param {string} word - a few characters or a complete word from input to check against relevant word node in the data model
 */
function find(word, object) {
  const model = new DataModel();
  model.search(object, word);
  return model.results;
}

module.exports = {
  generate, 
  find
};

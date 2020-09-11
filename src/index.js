const AUTOCOMPLETE_MODEL = require('./model');

/**
 * Add words to the data model
 * @param {string} word - word to be added to the model
 *
 */
function generate(words) {
  const autocompleteModel = new AUTOCOMPLETE_MODEL();
  return autocompleteModel.addBatch(words);
}

/**
 * Get all matching suffix
 * @param {strig} word - a few characters or a complete word from input to check against relevant word node in the data model
 */
function find(word, model) {
  const autocompleteModel = new AUTOCOMPLETE_MODEL();
  autocompleteModel.autoComplete(model, word);
  return autocompleteModel.results;
}

module.exports = {
  generate, 
  find
};

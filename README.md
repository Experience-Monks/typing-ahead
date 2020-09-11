# Autocomplete Model

This is a lightweight module for generating a data model to perform autocomplete operations in logarithmic time.

It has two methods that let you generate the data model and find all matching suffixes all words.

## Get Started

1. Import the module onto your project and build the data model by passing an array of words as below

2. Pass the mode and the word's prefixes to model to a `find` to get results


### Example

```
const AUTOCOMPLETE_MODEL = require('autocomplete-model');
const autocompleteModel = new AUTOCOMPLETE_MODEL();

const myModel = autocompleteModel.generate(words);
const result = autocompleteModel.find('se', myModel);
```

## Test
Everything about the test cases could be found inside `./__test__/index.test.js`

`npm test`

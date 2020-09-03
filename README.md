# Autocomplete Generator

This is an framework agnostic module for generating a data model to perform autocomplete operations in logarithmic time.

It has a number of methods that let you implement the data model to work with your components.

## Installation

Import the module onto your project and build the data model by passing an array of words as below:


```
const autocompleteGenerator = require('autocomplete-generator');

// instantiate data module
const autocompleteDataModel = new autocompleteGenerator();


// build the data model
const model = autocompleteDataModel.addBatch(["an array of words"]);


// call the search method from the same instance 
autocompleteDataModel.search('autocomp');

OR

// call the search method from the same instance 
autocompleteDataModel.search('autocomp', model);

```

Alternatively, we could also build the model and save it directly in our app instead of building the model asynchronously on every callback:

`autocompleteDataModel.buildFile(["an array of words"], './data', 'model.json');`


## Test
More about the test cases could be found inside `./test/index.test.js`

`npm test`

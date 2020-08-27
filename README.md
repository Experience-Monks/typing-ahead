# TST Autocomplete

A JS module for building a data model as [Ternary Search Tree](https://www.geeksforgeeks.org/ternary-search-tree/). It offers logarithmic running time (Ologn) in returning all matched suffix.

It is agnostic to any frameworks. It has a number of methods that let you implement the tst data model to work with your components. The only goal for this module is to generate a tst data model.


## Installation

Import the module onto your project and build the TST by passing an array of words as below:


```
const tstAutoComplete = require('tst-autcomplete');

// instantiate tst module
const tst = new tstAutoComplete();


// build tst data model
const model = tst.addBatch(["an array of words"]);


// call the search method from the same instance 
tst.search('autocomp');

OR

// call the search method from the same instance 
tst.search('autocomp', model);

```

Alternatively, we could also build the model and save it directly in the our app instead of building the model asynchronously on every callback:

`tst.buildFile(["an array of words"], './data', 'model.json');`


## Test
More about the test cases could be found inside `./test/index.test.js`

`npm test`

![Logo](/docs/typing-ahead-logo.jpg)

> Light-weight library to build data model for typeahead feature

# typing-ahead

This is a lightweight module for generating a data model to perform typeahead or autocomplete task in logarithmic time.

It has two public methods:

- generate: Lets you generate a data model consists of words
- find: Using the pre-generated data model, it finds the closest match of the input word

## Get Started

1. Import the module onto your project and build the data model by passing an array of words 

2. Pass the model and some characters to the `find` function to get results

### Example

```
const typingAhead = require('typing-ahead');

const myModel = typingAhead.generate(words);
const result = typingAhead.find('typing', myModel);
```

## Test
There are some test cases provided in  `./__test__/index.test.js` to ensure that the data model is built correctly.

`npm test`

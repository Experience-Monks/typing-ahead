![Logo](/docs/typing-ahead-logo.jpg)

> A lightweight library to build data model for typeahead feature
[![Known Vulnerabilities](https://snyk.io/test/github/Jam3/typing-ahead/badge.svg?targetFile=package.json)](https://snyk.io/test/github/Jam3/typing-ahead?targetFile=package.json) [![GitHub license](https://img.shields.io/github/license/Jam3/typing-ahead)](https://github.com/Jam3/typing-ahead/blob/master/LICENSE)

[![NPM](https://nodei.co/npm/typing-ahead.png)](https://nodei.co/npm/typing-ahead/)

# typing-ahead

This is a lightweight module for generating a data model to perform typeahead or autocomplete task in logarithmic time.

It has two public methods:

- generate: Lets you generate a data model consists of words
- find: Finds the closest match of the input word within the provided model

## Get Started

1. Import the module onto your project and build the data model by passing an array of words 

2. Pass the model and some characters to the `find` function to get results

### Example

```
const typingAhead = require('typing-ahead');

const myModel = typingAhead.generate(['typingahead', 'autocomplete']);
const results = typingAhead.find('typing', myModel); // result ['typingahead']
```

This example is made with [Jam3 NextJS Generator](https://github.com/Jam3/nyg-nextjs)
![Example](/docs/typing-ahead-example.gif)


## Unit Test
There are some test cases provided in  `./__test__/index.test.js` to ensure that the data model is built correctly.

`npm test`

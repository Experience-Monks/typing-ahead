const DataModel = require('../src/model/');
const API = require('../src/');
const { isBalanced } = require('../src/util/');
const data = require('../src/data/countries-dataset.min');
const fs = require('fs');
const words = ['search', 'sea', 'sear', 'app', 'all', 'apple', 'algorithm'];
const words_2 = ['search more', 'ocean and sky', 'sear', 'app', 'all', 'apple', 'algorithm'];
const words_3 = ['search', 'sea', 'sear'];

describe('Test Data structure functions and performance', () => {
  let model;

  beforeEach(() => {
    model = new DataModel();
  });

  it('add method exist', () => {
    expect(model.add).toBeDefined();
  });

  it('addBatch method exist', () => {
    expect(model.addBatch).toBeDefined();
  });

  it('invalid input set should return `null`', () => {
    expect(model.add(123)).toBeNull();
  });

  it('passing in a list of words should build model', () => {
    model.addBatch(words);
    expect(model.root).toBeDefined();
  });

  it('model should be balanced', () => {
    model.empty();
    model.addBatch(words);
    expect(isBalanced(model.root)).toBeTruthy();
  });

  it('model built with sorted input set with word inserted in linear manner should be unbalanced', () => {
    model.empty();
    model.add('algorithm');
    model.add('app');
    model.add('apple');
    model.add('search');
    model.add('sea');
    model.add('sear');
    model.add('telephone');
    model.add('telephone');
    model.add('zoo');
    expect(isBalanced(model.root)).toBeFalsy();
  });

  it('should get expected result of `se`', () => {
    model.empty();
    model.addBatch(words);
    model.search(model.get(), 'se');
    expect(model.results).toEqual(expect.arrayContaining(words_3));
  });

  it('should get expected result of `a`', () => {
    model.empty();
    model.addBatch(words_2);
    model.search(model.get(), 'A');
    expect(model.results).toEqual(expect.arrayContaining(['app', 'all', 'apple', 'algorithm']));
  });

  it('should get a list of countries matching the prefix - c', () => {
    model.empty();
    model.addBatch(data.map((country) => country.name));
    model.search(model.get(), 'sin');
    expect(model.results).toEqual(expect.arrayContaining(['singapore']));
  });
});

describe('Generated model and saved as json file', () => {
  it('should generate a json file containing model and return the matching prefix of - c', async () => {
    model = new DataModel();
    model.empty();
    const testFile = 'model.temp.json';
    const waitForFileToBeCreated = new Promise((resolve) =>
      fs.writeFile(`./__tests__/${testFile}`, JSON.stringify(model.build(data.map((country) => country.name))), () => {
        model.search(require(`./${testFile}`, 'c'));
        resolve(true);
      })
    );
    return waitForFileToBeCreated.then(() => {
      expect(model.results).toEqual(expect.arrayContaining(['canada']));
      fs.unlink(`./__tests__/${testFile}`, (err) => err && console.error(err));
    });
  });
});

describe('Test API', () => {
  it('should generate a balanced model', () => {
    const model = API.generate(words);
    expect(isBalanced(model)).toBeTruthy();
  });

  it('should get expected result of `se` from', () => {
    const model = API.generate(words);
    const result = API.find('se', model);
    expect(result).toEqual(expect.arrayContaining(words_3));
  });
});

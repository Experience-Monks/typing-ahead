const TernarySearchTree = require('../');
const { isBalanced } = require('../util/');
const countries = require('./countries-dataset.min');
const fs = require("fs");

describe('test TernarySearchTree', () => {

    let tst;

    beforeEach(() => {
        tst = new TernarySearchTree();
    });

    it('add method exist', () => {
        expect(tst.add).toBeDefined();
    });

    it('addBatch method exist', () => {
        expect(tst.addBatch).toBeDefined();
    });

    it('search method exist', () => {
        expect(tst.search).toBeDefined();
    });

    it('invalid input set should return `null`', () => {
        expect(tst.add(123)).toBeNull();
    });

    it('passing in a list of words should build tst', () => {
        tst.addBatch(["search", "sea", "sear", "app", "all", "apple", "algorithm"]);
        expect(tst.root).toBeDefined();
    });

    it('tst should be balanced', () => {
        tst.empty();
        tst.addBatch(["search", "sea", "sear", "app", "all", "apple", "algorithm"]);
        expect(isBalanced((tst.root))).toBeTruthy();
    });

    it('tst built with sorted input set and with word inserted in linear manner should be unbalanced', () => {
        tst.empty();
        tst.add('algorithm');
        tst.add('app');
        tst.add('apple');
        tst.add('search');
        tst.add('sea');
        tst.add('sear');
        tst.add('telephone');
        tst.add('telephone');
        tst.add('zoo');
        expect(isBalanced((tst.root))).toBeFalsy();
    });

    it('should get expected result of `se`', () => {
        tst.empty();
        tst.addBatch(["search", "sea", "sear", "app", "all", "apple", "algorithm"]);
        tst.search("se");
        expect(tst.results).toEqual(expect.arrayContaining(["search", "sea", "sear"]));
    });

    it('should get expected result of `se`', () => {
        tst.empty();
        tst.addBatch(["search more", "ocean and sky", "sear", "app", "all", "apple", "algorithm"]);
        tst.search("A");
        expect(tst.results).toEqual(expect.arrayContaining(["app", "all", "apple", "algorithm"]));
    });

    it('should get a list of countries matching the prefix - c', () => {
        tst.empty();
        tst.addBatch(countries.map(country => country.name));
        tst.search("sin");
        expect(tst.results).toEqual(expect.arrayContaining(["singapore"]));
    });

    it('should generate a json file of tst and return the matching prefix of - c', async () => {
        tst.empty();
        const testFile = 'tst.temp.json';
        const waitForFileToBeCreated =
            new Promise(resolve => fs.writeFile(`./test/${testFile}`,
                JSON.stringify(tst.build(countries.map(country => country.name))), () => {
                    tst.search("c", require(`./${testFile}`));
                    resolve(true);
                }));
        return waitForFileToBeCreated.then(() => {
                    expect(tst.results).toEqual(expect.arrayContaining(["canada"]));
                    fs.unlink(`./test/${testFile}`, err => err && console.error(err));
                });
    });
});

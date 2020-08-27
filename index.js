class TernarySearchTree {
    constructor() {
        this.root = null;
        this.word = null;
        this.results = [];
        this.entries = 0;
    }

    _addNode(node, word, data) {
        if (word.length < 1) {
            return null;
        }

        const newChar = word[0].toLowerCase();
        const currentNode = node || this._createNode(newChar);

        if (!this.root) {
            this.root = currentNode;
        }

        if (newChar < currentNode.char) {
            currentNode.left = this._addNode(currentNode.left, word, data);
        } else if (newChar > currentNode.char) {
            currentNode.right = this._addNode(currentNode.right, word, data);
        } else {
            if (word.length > 1) {
                currentNode.center = this._addNode(currentNode.center, word.slice(1), data);
            } else {
                currentNode.isEndOfWord = true;
                currentNode.data = data;
                currentNode.word.push(this.word);
                this.entries += 1;
            }
        }

        return currentNode;
    }

    _autoComplete(node, word) {
        if (!node) {
            return;
        }
        if (!word || word.length <= 0) {
            return this._allSuffix(node);
        }
        const firstChar = word[0].toLowerCase();
        if (firstChar < node.char) {
            this._autoComplete(node.left, word);
        } else if (firstChar > node.char) {
            this._autoComplete(node.right, word);
        } else {
            this._autoComplete(node.center, word.slice(1));
        }
    }

    /**
     * Based on https://www.drdobbs.com/database/ternary-search-trees/184410528?pgno=1,
     * this is the most optimized way to build the TST
     */
    _addBatchNodesRecursively(words, start, end, data) {
        if(end === start) {
            return;
        }
        const middle = Math.floor((start + end - 1) / 2);
        this.word = words[middle].toLowerCase();
        this._addNode(this.root, words[middle], data);
        if (middle > start) {
            this._addBatchNodesRecursively(words, start, middle, data);
        }
        if (middle < end - 1){
            this._addBatchNodesRecursively(words, middle + 1, end, data);
        }
    }

    _allSuffix(node) {
        if (!node) {
            return;
        }
        if (node.isEndOfWord) {
            this.results.push(...node.word);
        }
        this._allSuffix(node.left);
        this._allSuffix(node.right);
        this._allSuffix(node.center);
    }

    _createNode(char) {
        return {
            char: char,
            center: null,
            left: null, 
            right: null, 
            word: [],
            isEndOfWord: false,
        };
    }

    /**
     * Add word to the Ternary Search Tree
     * @param {string} word - word to be added to the tree
     * @param {string} data - additional data that associate with given word
     */
    add(word, data) {
        if (typeof word !== 'string' || word.length <= 0) {
            return null;
        }
        this.word = word;
        this._addNode(this.root, word, data);
    }

    /**
     * Add a batch of words to TST
     * @param {Array<string>} words - a list words to be added to the TST
     * @param {string} data - additional info associated with each word in the list
     */
    addBatch(words, data) {
        words.sort();
        this._addBatchNodesRecursively(words, 0, words.length, data);
        return this.root;
    }

    build(words) {
        this.addBatch(words);
        const tst_model = this.root;
        this.root = null;
        return tst_model;
    }

    /**
     * Remove all nodes from TST
     */
    empty() {
        this.root = null;
        this.results = [];
    }

    /**
     * Autocomplete
     * @param {strig} word - a few characters ofprefix or a complete word from input to check against relevant word node in TST
     */
    search(word, tree) {
        if (typeof word !== 'string' ) {
            return 1;
        }
        if (tree) {
            this.root = tree;
        }
        this.results = [];
        this._autoComplete(this.root, word);
    }
}

module.exports = TernarySearchTree;
class AutocompleteModel {
  constructor() {
    this.root = null;
    this.word = null;
    this.results = [];
    this.entries = 0;
  }

  _addNode(node, word) {
    if (word.length < 1) {
      return null;
    }

    const newChar = word[0].toLowerCase();
    const currentNode = node || this._createNode(newChar);

    if (!this.root) {
      this.root = currentNode;
    }

    if (newChar < currentNode.char) {
      currentNode.left = this._addNode(currentNode.left, word);
    } else if (newChar > currentNode.char) {
      currentNode.right = this._addNode(currentNode.right, word);
    } else {
      if (word.length > 1) {
        currentNode.center = this._addNode(currentNode.center, word.slice(1));
      } else {
        currentNode.isEndOfWord = true;
        currentNode.word.push(this.word);
        this.entries += 1;
      }
    }

    return currentNode;
  }

  /**
   * Based on https://www.drdobbs.com/database/ternary-search-trees/184410528?pgno=1,
   * this is the most optimized way to build the model
   */
  _addBatchNodesRecursively(words, start, end) {
    if (end === start) {
      return;
    }
    const middle = Math.floor((start + end - 1) / 2);
    this.word = words[middle].toLowerCase();
    this._addNode(this.root, words[middle]);
    if (middle > start) {
      this._addBatchNodesRecursively(words, start, middle);
    }
    if (middle < end - 1) {
      this._addBatchNodesRecursively(words, middle + 1, end);
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

  autoComplete(node, word) {
    if (!node) {
      return;
    }
    if (!word || word.length <= 0) {
      return this._allSuffix(node);
    }
    const firstChar = word[0].toLowerCase();
    if (firstChar < node.char) {
      this.autoComplete(node.left, word);
    } else if (firstChar > node.char) {
      this.autoComplete(node.right, word);
    } else {
      this.autoComplete(node.center, word.slice(1));
    }
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
   * Add a batch of words to model
   * @param {Array<string>} words - a list words to be added to the TST
   */
  addBatch(words) {
    words.sort();
    this._addBatchNodesRecursively(words, 0, words.length);
    return this.root;
  }

  build(words) {
    this.addBatch(words);
    const tst_model = this.root;
    this.root = null;
    return tst_model;
  }

  /**
   * Remove all nodes from model
   */
  empty() {
    this.root = null;
    this.results = [];
  }

  /**
   * Search
   * @param {strig} word - a few characters or a complete word from input to check against relevant word node in TST
   */
  search(word, tree) {
    if (typeof word !== 'string') {
      return 1;
    }
    if (tree) {
      this.root = tree;
    }
    this.results = [];
    this.autoComplete(this.root, word);
  }
}

module.exports = AutocompleteModel;

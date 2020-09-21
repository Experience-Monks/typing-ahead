class DataModel {
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

    if (currentNode.char === '0') {
      currentNode.char = newChar;
    }

    if (newChar < currentNode.char) {
      currentNode.left = this._addNode(currentNode.left, word);
    } else if (newChar > currentNode.char) {
      currentNode.right = this._addNode(currentNode.right, word);
    } else {
      if (word.length > 1) {
        currentNode.center = this._addNode(currentNode.center, word.slice(1));
      } else {
        const leaftNode = currentNode.center || this._createNode('0');
        leaftNode.isEndOfWord = true;
        leaftNode.word.push(this.word);
        currentNode.center = leaftNode;
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

  get() {
    return this.root;
  }

  /**
   * Add word to the model
   * @param {string} word - word to be added to the model
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
   * @param {Array<string>} words - a list words to be added to the model
   */
  addBatch(words) {
    words.sort();
    this._addBatchNodesRecursively(words, 0, words.length);
    return this.root;
  }

  /**
   * Output the model
   * @param {Array<string>} words - a list words to be added to the model
   */
  build(words) {
    this.addBatch(words);
    const model = this.root;
    this.root = null;
    return model;
  }

  /**
   * Remove all nodes from model
   */
  empty() {
    this.root = null;
    this.results = [];
  }

  /**
   * The main method for user to get suggested words
   * @param {Object} node
   * @param {string} word
   */
  search(node, word, isEndOfInput) {
    if (!node) {
      return;
    }
    if (isEndOfInput && (!word || word.length <= 0)) {
      this._allSuffix(node);
      return this.results;
    }
    const firstChar = word[0].toLowerCase();
    if (firstChar < node.char) {
      this.search(node.left, word, false);
    } else if (firstChar > node.char) {
      this.search(node.right, word, false);
    } else {
      this.search(node.center, word.slice(1), true);
    }
  }
}

module.exports = DataModel;

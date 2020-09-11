function _getHeight(root) {
    if (root === null) { // Base case
        return 0;
    }
    return Math.max(_getHeight(root.left), _getHeight(root.right)) + 1;
};

/**
 * This `isBalanced` function is referencing the source code here https://js-algorithms.tutorialhorizon.com/
 * Time Complexity: O(NlogN)
 */

function isBalanced(root) {
    if (root === null) { // Base case
        return true;
    }
    var heightDifference = Math.abs(_getHeight(root.left) - _getHeight(root.right));
    if (heightDifference > 1) {
        return false;
    } else {
        return isBalanced(root.left) && isBalanced(root.right);
    }
}

module.exports = {
  isBalanced
};


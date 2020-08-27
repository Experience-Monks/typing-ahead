/**
 * https://js-algorithms.tutorialhorizon.com/
 * Time Complexity: O(NlogN)
 */

function _getHeight(root) {
    if (root === null) { // Base case
        return 0;
    }
    return Math.max(_getHeight(root.left), _getHeight(root.right)) + 1;
};

isBalanced = (root) => {
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


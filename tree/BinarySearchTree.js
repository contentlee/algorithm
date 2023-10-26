class Node {
  constructor(val) {
    this.value = val;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  root = null;

  insert(val) {
    const node = new Node(val);
    if (!this.root) {
      this.root = node;
    }

    let next = this.root;
    while (next) {
      if (val > next.value) {
        if (!next.right) break;
        next = next.right;
      } else {
        if (!next.left) break;
        next = next.left;
      }
    }

    if (val > next.value) {
      next.right = node;
    } else if (val < next.value) {
      next.left = node;
    } else {
      return null;
    }
  }

  find(val) {
    let node = this.root;
    while (node.value !== val) {
      if (node.value < val) {
        node = node.right;
      } else if (node.value > val) {
        node = node.left;
      } else {
        break;
      }
    }
    return node;
  }
}

// const tree = new BinarySearchTree();

// tree.insert(1);
// tree.insert(5);
// tree.insert(15);
// tree.insert(4);
// tree.insert(1);

// console.log(tree.root);
// console.log(tree.find(15));

export default BinarySearchTree;

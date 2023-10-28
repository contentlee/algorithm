import Tree from "./BinarySearchTree.js";

class Dfs extends Tree {
  constructor() {
    super();
  }

  preOrder() {
    const root = this.root;
    const result = [];
    const traverse = (node) => {
      result.push(node.value);
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
    };
    traverse(root);

    return result;
  }

  inOrder() {
    const root = this.root;
    const result = [];
    const traverse = (node) => {
      if (node.left) traverse(node.left);
      result.push(node.value);
      if (node.right) traverse(node.right);
    };
    traverse(root);

    return result;
  }

  postOrder() {
    const root = this.root;
    const result = [];
    const traverse = (node) => {
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
      result.push(node.value);
    };
    traverse(root);

    return result;
  }
}

const tree = new Dfs();
tree.insert(8);
tree.insert(4);
tree.insert(5);
tree.insert(15);
tree.insert(1);

console.log(tree.preOrder());

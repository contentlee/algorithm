import Tree from "./BinarySearchTree.js";
import Queue from "../queue/Queue.js";

class Bfs extends Tree {
  constructor() {
    super();
  }

  export() {
    const queue = new Queue();
    const result = [];

    queue.enqueue(this.root);
    while (queue.length) {
      const node = queue.dequeue().value;
      if (node.left) queue.enqueue(node.left);
      if (node.right) queue.enqueue(node.right);
      result.push(node.value);
    }

    return result;
  }
}

const tree = new Bfs();
tree.insert(2);
tree.insert(1);
tree.insert(5);
tree.insert(15);
tree.insert(4);
tree.insert(1);

console.log(tree.export());

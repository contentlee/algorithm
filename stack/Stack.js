class Node {
  constructor(val) {
    this.value = val;
    this.next = null;
  }
}

class Stack {
  head = null;
  length = 0;

  push(val) {
    const node = new Node(val);
    const head = this.head;

    node.next = head;
    this.head = node;
    this.length++;
  }

  pop() {
    if (this.length === 0) return null;
    const node = this.head;
    const next = node.next;

    node.next = null;
    this.head = next;
    this.length--;
    return node;
  }
}

const stack = new Stack();
stack.push(2);
stack.push(5);
stack.push(7);

console.log(stack.pop());
console.log(stack.pop());

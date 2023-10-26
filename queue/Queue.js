class Node {
  constructor(val) {
    this.value = val;
    this.next = null;
  }
}

class Queue {
  head = null;
  tail = null;
  length = 0;

  enqueue(val) {
    const node = new Node(val);
    if (this.length === 0) {
      this.head = node;
      this.tail = node;
      this.length++;
      return;
    }
    this.tail.next = node;
    this.tail = node;
    this.length++;
  }

  dequeue() {
    if (this.length === 0) return null;
    const head = this.head;
    const node = this.head.next;

    head.next = null;
    this.head = node;
    this.length--;

    return head;
  }
}

// const queue = new Queue();

// queue.enqueue(2);
// queue.enqueue(5);
// queue.enqueue(7);

// console.log(queue.dequeue());
// console.log(queue.dequeue());

export default Queue;

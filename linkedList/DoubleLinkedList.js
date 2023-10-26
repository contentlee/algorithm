class Node {
  constructor(val) {
    this.value = val;
    this.prev = null;
    this.next = null;
  }
}

class DoubleLinkedList {
  head = null;
  tail = null;
  length = 0;

  get(idx) {
    let time = 0;
    let node = this.head;
    while (node.next) {
      if (time === idx) break;
      node = node.next;
      time++;
    }

    if (idx !== time) return null;
    return node;
  }

  set(idx, val) {
    const node = this.get(idx);
    if (!node) return;

    node.value = val;
  }

  push(val) {
    const node = new Node(val);

    if (this.length === 0) {
      this.head = node;
      this.tail = node;
      this.length++;
      return;
    }

    const prev = this.tail;

    node.prev = prev;
    prev.next = node;
    this.tail = node;
    this.length++;
  }

  pop() {
    if (this.length === 0) return;
    let node = this.head;
    let prev = null;

    while (node.next) {
      prev = node;
      node = node.next;
    }

    prev.next = null;
    node.prev = null;
    this.tail = prev;
    this.length--;

    return node;
  }

  unshift(val) {
    const node = new Node(val);
    if (this.length === 0) {
      this.head = node;
      this.tail = node;
      this.length++;
      return;
    }

    const head = this.head;
    node.next = head;
    head.prev = node;
    this.head = node;
    this.length++;
  }

  shift() {
    if (this.length === 0) return;
    const head = this.head;
    const next = this.head.next;

    next.prev = null;
    head.next = null;
    this.head = next;
    this.length--;

    return head;
  }

  insert(idx, val) {
    const node = new Node(val);
    const prev = this.get(idx - 1);
    const next = prev.next;

    if (!next) {
      this.push(val);
      return;
    }
    if (!prev) return;

    prev.next = node;
    next.prev = node;
    node.prev = prev;
    node.next = next;

    this.length++;
  }

  remove(idx) {
    if (this.length === 0) return;
    const node = this.get(idx);
    const prev = node.prev;
    const next = node.next;

    if (!next) {
      this.pop();
      return;
    }
    if (!prev || !node) return;

    node.prev = null;
    node.next = null;
    prev.next = next;
    next.prev = prev;
  }
}

const linkedList = new DoubleLinkedList();

linkedList.push(52);
linkedList.push(22);
linkedList.push(42);
linkedList.push(12);
linkedList.push(92);
linkedList.push(21);
console.log(linkedList.head);

linkedList.pop();
console.log(linkedList.head);

linkedList.shift();
console.log(linkedList.head);

console.log(linkedList.get(3));
linkedList.set(2, 2);
linkedList.insert(1, 4);
linkedList.remove(2);
console.log(linkedList.head);

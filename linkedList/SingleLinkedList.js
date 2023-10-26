class Node {
  constructor(val) {
    this.value = val;
    this.next = null;
  }
}

class SingleLinkedList {
  head = null;
  tail = null;
  length = 0;

  get(idx) {
    let time = 0;
    let node = this.head;
    while (time < idx) {
      node = node.next;
      time++;
    }
    if (time !== idx) return null;
    return node;
  }

  set(idx, val) {
    const node = this.get(idx);
    if (!node) return;
    node.value = val;
  }

  push(val) {
    if (this.length === 0) {
      this.unshift(val);
      this.tail = this.head;
      return;
    }
    this.tail.next = new Node(val);
    this.tail = this.tail.next;
    this.length++;
  }
  pop() {
    if (this.length === 0) return null;
    const last = this.tail;

    let pre = this.head;

    while (pre.next.next) {
      pre = pre.next;
    }
    pre.next = null;
    this.length--;

    return last;
  }

  unshift(val) {
    const first = this.head;
    this.head = new Node(val);
    this.head.next = first;
    this.length++;
  }

  shift() {
    if (this.length === 0) return null;
    const first = this.head;
    this.head = this.head.next;
    this.length--;
    return first;
  }

  insert(idx, val) {
    const node = this.get(idx - 1);
    if (!node) return;
    const next = node.next;
    node.next = new Node(val);
    node.next.next = next;
    this.length++;
  }

  remove(idx) {
    if (this.length === 0) return null;
    if (idx === 0) {
      this.shift();
      return;
    }

    const node = this.get(idx - 1);
    if (!node) return;
    const next = node.next.next;
    node.next = next;

    this.length--;
  }

  reverse() {
    const tail = this.head;

    let pre = this.head;
    let node = this.head.next;
    let next = this.head.next.next;
    pre.next = null;
    while (next) {
      node.next = pre;
      pre = node;
      node = next;
      next = node.next;
    }
    node.next = pre;
    this.head = node;
    this.tail = tail;
  }
}

const linkedList = new SingleLinkedList();

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
linkedList.reverse();
console.log(linkedList.head);

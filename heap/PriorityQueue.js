class PriorityQueue {
  array = [];

  insert(value) {
    this.array.push(value);
    const idx = this.bubbleUp(value);
    this.array[idx] = value;
  }

  bubbleUp(value) {
    let idx = this.array.length - 1;

    while (idx > 0) {
      const parentIdx = Math.floor((idx - 1) / 2);
      const parent = this.array[parentIdx];
      if (parent.priority < value.priority) break;
      this.array[idx] = parent;
      idx = parentIdx;
    }

    return idx;
  }

  extractFirst() {
    const value = this.array.pop();
    const first = this.array[0];

    const idx = this.sinkDown(value);
    this.array[idx] = value;

    return first;
  }

  sinkDown(value) {
    let idx = 0;

    while (idx < this.array.length - 1) {
      const childIdx1 = 2 * idx + 1;
      const child1 = this.array[childIdx1];
      const childIdx2 = 2 * idx + 2;
      const child2 = this.array[childIdx2];

      if (Math.min(child1.priority, child2.priority, value.priority) === value.priority || !child1) break;

      if (child1.priority > child2.priority) {
        this.array[idx] = child2;
        idx = childIdx2;
      } else {
        if (Math.min(child1.priority, value.priority) === value.priority) break;
        this.array[idx] = child1;
        idx = childIdx1;
        if (!child2) break;
      }
    }
    return idx;
  }
}

const priorityQueue = new PriorityQueue();

priorityQueue.insert({ val: "person1", priority: 41 });
priorityQueue.insert({ val: "person2", priority: 11 });
priorityQueue.insert({ val: "person2", priority: 12 });
priorityQueue.insert({ val: "person2", priority: 10 });
priorityQueue.insert({ val: "person2", priority: 11 });

console.log(priorityQueue.array);
console.log(priorityQueue.extractFirst());
console.log(priorityQueue.array);

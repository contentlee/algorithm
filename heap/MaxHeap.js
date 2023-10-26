// 자식 요소 찾기 => 2n+1, 2n+2
// 부모 요소 찾기 => (n-1)/2

class MaxHeap {
  array;

  constructor(initArray = []) {
    this.array = initArray;
  }

  insert(value) {
    this.array.push(value);
    this.bubbleUp(value);
  }

  bubbleUp(value) {
    let idx = this.array.length - 1;
    while (idx > 0) {
      const parentIdx = Math.floor((idx - 1) / 2);
      const parentValue = this.array[parentIdx];
      if (value <= parentValue) break;
      this.array[idx] = parentValue;
      idx = parentIdx;
    }
    this.array[idx] = value;
  }

  extractMax() {
    const value = this.array.pop();
    const max = this.array[0];

    this.sinkDown(value);

    return max;
  }

  sinkDown(value) {
    let idx = 0;
    while (idx < this.array.length - 1) {
      const childIdx1 = 2 * idx + 1;
      const child1 = this.array[childIdx1];
      const childIdx2 = 2 * idx + 2;
      const child2 = this.array[childIdx2];

      if (Math.max(value, child1, child2) === value || !child1) break;

      if (child1 < child2) {
        this.array[idx] = child2;
        idx = childIdx2;
      } else {
        if (Math.max(child1, value) === value) break;
        this.array[idx] = child1;
        idx = childIdx1;
        if (!child2) break;
      }
    }
    this.array[idx] = value;
  }
}

const maxHeap = new MaxHeap([55, 39, 41, 18, 27, 12, 33]);

maxHeap.insert(41);
maxHeap.insert(11);

console.log(maxHeap.array);
console.log(maxHeap.extractMax());
console.log(maxHeap.array);

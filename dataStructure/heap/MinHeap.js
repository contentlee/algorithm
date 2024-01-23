// 부모 요소 찾기 : (n-1)/2
// 자식 요소 찾기 : 2n+1 2n+2

class MinHeap {
  // array는 tree 구조
  array;

  constructor(initArray = []) {
    this.array = initArray;
  }

  insert(value) {
    this.array.push(value);
    const idx = this.bubbleUp(value);
  }

  bubbleUp(value) {
    let idx = this.array.length - 1;

    while (idx > 0) {
      const parentIdx = Math.floor(idx / 2);
      const parent = this.array[parentIdx];
      if (parent <= value) break;
      this.array[idx] = parent;
      idx = parentIdx;
    }
    this.array[idx] = value;
  }

  extractMin() {
    const min = this.array[0];
    const val = this.array.pop();

    this.sinkDown(val);

    return min;
  }

  sinkDown(val) {
    let idx = 0;

    while (idx < this.array.length - 1) {
      const childIdx1 = 2 * idx + 1;
      const child1 = this.array[childIdx1];
      const childIdx2 = 2 * idx + 2;
      const child2 = this.array[childIdx2];

      if (Math.min(val, child1, child2) === val || !child1) break;

      if (child2 < child1) {
        this.array[idx] = child2;
        idx = childIdx2;
      } else {
        if (Math.min(val, child1) === val) break;
        this.array[idx] = child1;
        idx = childIdx1;
        if (!child2) break;
      }
    }
    this.array[idx] = val;
  }
}

const minHeap = new MinHeap();

minHeap.insert(11);
minHeap.insert(10);
minHeap.insert(14);
minHeap.insert(11);
minHeap.insert(12);
minHeap.insert(16);
minHeap.insert(17);
minHeap.insert(41);
minHeap.insert(42);

console.log(minHeap.array);
console.log(minHeap.extractMin());
console.log(minHeap.extractMin());
console.log(minHeap.extractMin());
console.log(minHeap.extractMin());
console.log(minHeap.extractMin());

console.log(minHeap.array);

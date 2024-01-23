// 1. Fast
// 2. Doesn't cluster outputs at specific indices, but distributes uniformly
// 3. Deterministic

// for the collision
// 1. Separate Chaining => 키 값을 이중으로 사용
// 2. Linear Probing => 다음 빈칸 사용

class HashTable {
  constructor(size = 53) {
    this.keyMap = new Array(size);
  }

  _hash(key) {
    let total = 0;
    // almost prime number
    let WEIRD_PRIME = 31;
    for (let i = 0; i < Math.min(key.length, 100); i++) {
      let char = key[i];
      let value = char.charCodeAt(0) - 96;
      total = (total + value + WEIRD_PRIME) % this.keyMap.length;
    }
    return total;
  }

  // Separate Chaining
  get1(key) {
    const idx = this._hash(key);
    if (!this.keyMap[idx]) return undefined;
    if (this.keyMap[idx].length > 1) {
      return this.keyMap[idx].filter(([k]) => k === key)[0][1];
    } else {
      return this.keyMap[idx][0][1];
    }
  }

  set1(key, value) {
    const idx = this._hash(key);
    if (!idx) return;
    if (!this.keyMap[idx]) this.keyMap[idx] = [];
    this.keyMap[idx].push([key, value]);
  }

  keys1() {
    const res = [];
    this.keyMap.forEach((arr) => {
      if (arr)
        arr.forEach(([key]) => {
          res.push(key);
        });
    });
    return res;
  }

  values1() {
    const res = [];
    this.keyMap.forEach((arr) => {
      if (arr)
        arr.forEach(([_, value]) => {
          res.push(value);
        });
    });
    return res;
  }

  // Linear Probing
  get2(key) {
    let idx = this._hash(key);
    if (!this.keyMap[idx]) return undefined;
    if (this.keyMap[idx][0][0] === key) {
      return this.keyMap[idx][0][1];
    } else {
      while (this.keyMap[idx] && this.keyMap[idx][0][0] !== key) {
        idx++;
      }
      return this.keyMap[idx][0][1];
    }
  }

  set2(key, value) {
    let idx = this._hash(key);
    if (!idx) return;
    if (!this.keyMap[idx]) {
      this.keyMap[idx] = [];
      this.keyMap[idx].push([key, value]);
    } else {
      if (this.keyMap[idx][0][0] === key) {
        this.keyMap[idx][0][1] = value;
      } else {
        while (this.keyMap[idx]) {
          idx++;
        }
        this.keyMap[idx] = [];
        this.keyMap[idx].push([key, value]);
      }
    }
  }

  keys2() {
    const res = [];
    this.keyMap.forEach((arr) => {
      if (arr) res.push(arr[0][0]);
    });
    return res;
  }

  values2() {
    const res = [];
    this.keyMap.forEach((arr) => {
      if (arr) res.push(arr[0][1]);
    });
    return res;
  }
}

const hashTable = new HashTable();

hashTable.set2("blue", 13);
hashTable.set2("red", 11);
hashTable.set2("green", 15);
hashTable.set2("pink", 114);
hashTable.set2("fog", 18);

console.log(hashTable._hash("fog"));
console.log(hashTable._hash("pink"));

console.log(hashTable.get2("blue"));
console.log(hashTable.get2("fog"));
console.log(hashTable.get2("pink"));
console.log(hashTable.keys2());
console.log(hashTable.keyMap);

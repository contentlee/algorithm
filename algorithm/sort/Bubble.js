// time complexity : O(n**2)

const array = [5, 14, 20, 1, 2, 8, 5];

for (let i = array.length - 1; i > 0; i--) {
  let noSwap = true;
  for (let j = 0; j < i; j++) {
    if (array[j] > array[j + 1]) {
      [array[j], array[j + 1]] = [array[j + 1], array[j]];
      noSwap = false;
    }
  }
  if (noSwap) break;
}

console.log(array);

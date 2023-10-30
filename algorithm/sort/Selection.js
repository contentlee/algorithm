// time complexity : O(n**2)

const array = [5, 14, 20, 1, 2, 8, 5];

for (let i = 0; i < array.length - 1; i++) {
  let minIdx = i;
  for (let j = i + 1; j < array.length; j++) {
    if (array[minIdx] > array[j]) minIdx = j;
  }
  [array[i], array[minIdx]] = [array[minIdx], array[i]];
}

console.log(array);

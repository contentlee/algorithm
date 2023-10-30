// time complexity : O(n**2)

const array = [5, 14, 20, 1, 2, 8, 5];

for (let i = 1; i < array.length; i++) {
  let val = array[i];
  let idx = i;
  for (let j = i - 1; j >= 0 && array[j] > val; j--) {
    array[j + 1] = array[j];
    idx = j;
  }
  array[idx] = val;
}

console.log(array);

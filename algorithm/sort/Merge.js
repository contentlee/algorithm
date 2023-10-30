// 1948 Fon Neumann
// decomposing + merging + sorting
// time complexity : O(n * log n)

let array = [5, 14, 20, 1, 2, 8, 5];
let n = 2;

while (n / 2 < array.length) {
  let tmp = [];
  for (let i = 0; i < array.length; i += n) {
    let left = i;
    let right = i + n / 2;
    while (left < i + n / 2 || right < i + n) {
      if (left >= i + n / 2) {
        if (array[right]) tmp.push(array[right]);
        right++;
        continue;
      }

      if (right >= i + n) {
        tmp.push(array[left]);
        left++;
        continue;
      }

      if (array[left] > array[right]) {
        tmp.push(array[right]);
        right++;
      } else {
        tmp.push(array[left]);
        left++;
      }
    }
  }
  n = n * 2;
  array = tmp;
}

console.log(array);

// 강의

const merge = (arr1, arr2) => {
  const result = [];

  let i = 0;
  let j = 0;

  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) {
      result.push(arr1[i]);
      i++;
    } else {
      result.push(arr2[j]);
      j++;
    }
  }

  while (i < arr1.length) {
    result.push(arr1[i]);
    i++;
  }

  while (j < arr2.length) {
    result.push(arr2[j]);
    j++;
  }

  return result;
};

const mergeSort = (arr) => {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
};

console.log(mergeSort(array));

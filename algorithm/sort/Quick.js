// time complexity : O(n**2)

let array = [5, 14, 20, 1, 2, 8, 5];

// const quickSort = (arr) => {
//   let standard = 0;
//   let changed = 1;
//   let last = arr.length - 1;
//   let idx = 1;

//   let noSwap = true;
//   let allSwap = true;

//   while (standard < last) {
//     if (idx > last) {
//       if (noSwap) standard++;
//       else [arr[standard], arr[changed - 1]] = [arr[changed - 1], arr[standard]];

//       if (allSwap) last--;

//       changed = standard + 1;
//       idx = standard + 1;
//       noSwap = true;
//       allSwap = true;
//     }

//     if (arr[standard] > arr[idx]) {
//       if (idx !== changed) [arr[idx], arr[changed]] = [arr[changed], arr[idx]];
//       changed += 1;
//       noSwap = false;
//     } else {
//       allSwap = false;
//     }

//     idx++;
//   }

//   return arr;
// };

// console.log(quickSort(array));

const sort = (arr) => {
  if (arr.length <= 0) return [];
  if (arr.length === 1) return [arr[0]];
  const standard = arr[0];
  const lower = [];
  const large = [];

  for (let i = 1; i < arr.length; i++) {
    if (arr[0] < arr[i]) large.push(arr[i]);
    else lower.push(arr[i]);
  }

  return [...sort(lower), standard, ...sort(large)];
};

// 강의

const pivot = (arr, start = 0, end = arr.length) => {
  let swapIdx = start;
  for (let i = start + 1; i < end + 1; i++) {
    if (arr[start] > arr[i]) {
      swapIdx++;
      [arr[swapIdx], arr[i]] = [arr[i], arr[swapIdx]];
    }
  }
  [arr[start], arr[swapIdx]] = [arr[swapIdx], arr[start]];
  return swapIdx;
};

const quickSort = (arr, left = 0, right = arr.length - 1) => {
  if (left < right) {
    const pivotIdx = pivot(arr, left, right);

    quickSort(arr, left, pivotIdx - 1);
    quickSort(arr, pivotIdx + 1, right);
  }

  return arr;
};

console.log(quickSort(array));

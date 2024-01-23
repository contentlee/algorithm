// time complexity : O(n**2)
// bubble sort는 인접해있는 두 요소를 비교하여, 한 번의 round 마다 한쪽 끝부터 정렬될 수 있도록 함

const array = [5, 14, 20, 1, 2, 8, 5];

// i가 0일 때는 중첩된 반복문이 실행되지 않으므로, 0을 포함시키지 않음
for (let i = array.length - 1; i > 0; i--) {
  // noSwap은 정렬이 발생하는지 확인하는 flag (정렬이 반복되는 횟수를 최적화하기 위한 방법)
  let noSwap = true;
  for (let j = 0; j < i; j++) {
    if (array[j] > array[j + 1]) {
      // destructuring assignment (es6)
      [array[j], array[j + 1]] = [array[j + 1], array[j]];
      noSwap = false;
    }
  }
  if (noSwap) break;
}

console.log(array);

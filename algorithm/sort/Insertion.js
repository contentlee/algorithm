// time complexity : O(n**2)
// insertion sort는 round가 진행될 때마다 자신의 앞에 있는 요소들과 자신을 비교해 요소를 정렬한다

const array = [5, 14, 20, 1, 2, 8, 5];

for (let i = 1; i < array.length; i++) {
  // val는 기준이 되는 값이므로 변할 필요가 없음
  const val = array[i];
  let idx = i;
  for (let j = i - 1; j >= 0 && array[j] > val; j--) {
    array[j + 1] = array[j];
    idx = j;
  }
  array[idx] = val;
}

console.log(array);

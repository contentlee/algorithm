// 1. 반복되는 하위 문제  ex) Fibonacci sequence
// 2. 최적 부분 구조 (optimal substructure)

function Fibonacci(n) {
  if (n <= 2) return 1;
  return Fibonacci(n - 1) + Fibonacci(n - 2);
}

// memoization

function solution1(n, memo = [undefined, 1, 1]) {
  if (memo[n] > 0) return memo[n];
  if (n <= 2) return 1;
  const res = solution1(n - 1, memo) + solution1(n - 2, memo);
  memo[n] = res;
  return res;
}

console.log(solution1(100));

// tabulation
// top-down => bottom-up

function solution2(n) {
  if (n <= 2) return 1;
  const arr = [0, 1, 1];
  for (let i = 3; i <= n; i++) {
    arr[i] = arr[i - 1] + arr[i - 2];
  }

  return arr[n];
}

console.log(solution2(100));

// 동적계획법이란 큰 문제를 작은 단위로 나눈 뒤,
// 작은 문제의 해결에서 나온 법칙을 큰 문제의 해결로 확장하는 방법

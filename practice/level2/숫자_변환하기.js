// 자연수 x를 y로 변환하려고 합니다. 사용할 수 있는 연산은 다음과 같습니다.

// x에 n을 더합니다
// x에 2를 곱합니다.
// x에 3을 곱합니다.
// 자연수 x, y, n이 매개변수로 주어질 때,
// x를 y로 변환하기 위해 필요한 최소 연산 횟수를 return하도록 solution 함수를 완성해주세요.
// 이때 x를 y로 만들 수 없다면 -1을 return 해주세요.

// 제한사항
// 1. 1 ≤ x ≤ y ≤ 1,000,000
// 2. 1 ≤ n < y

// 입출력 예
// x	  y	  n	  result
// 10	  40	5	  2
// 10	  40	30	1
// 2	  5	  4 	-1

function solution(x, y, n) {
  const queue = [];
  queue.push({ sum: y, cnt: 0 });

  let idx = 0;

  while (idx < queue.length) {
    const { sum, cnt } = queue[idx];

    if (sum === x) break;
    if (sum < 0) {
      idx++;
      continue;
    }

    queue.push({ sum: sum - n, cnt: cnt + 1 });
    if (sum % 2 === 0) queue.push({ sum: sum / 2, cnt: cnt + 1 });
    if (sum % 3 === 0) queue.push({ sum: sum / 3, cnt: cnt + 1 });

    idx++;
  }

  return queue[idx] ? queue[idx].cnt : -1;
}

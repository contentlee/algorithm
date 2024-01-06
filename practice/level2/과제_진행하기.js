// 문제 설명
// 과제를 받은 루는 다음과 같은 순서대로 과제를 하려고 계획을 세웠습니다.

// 과제는 시작하기로 한 시각이 되면 시작합니다.
// 새로운 과제를 시작할 시각이 되었을 때, 기존에 진행 중이던 과제가 있다면
// 진행 중이던 과제를 멈추고 새로운 과제를 시작합니다.
// 진행중이던 과제를 끝냈을 때, 잠시 멈춘 과제가 있다면,
// 멈춰둔 과제를 이어서 진행합니다.
// 만약, 과제를 끝낸 시각에 새로 시작해야 되는 과제와 잠시 멈춰둔 과제가 모두 있다면,
// 새로 시작해야 하는 과제부터 진행합니다.
// 멈춰둔 과제가 여러 개일 경우, 가장 최근에 멈춘 과제부터 시작합니다.
// 과제 계획을 담은 이차원 문자열 배열 plans가 매개변수로 주어질 때,
// 과제를 끝낸 순서대로 이름을 배열에 담아 return 하는 solution 함수를 완성해주세요.

// 제한사항
// 1. 3 ≤ plans의 길이 ≤ 1,000
//  - plans의 원소는 [name, start, playtime]의 구조로 이루어져 있습니다.
//    - name : 과제의 이름을 의미합니다.
//      - 2 ≤ name의 길이 ≤ 10
//      - name은 알파벳 소문자로만 이루어져 있습니다.
//      - name이 중복되는 원소는 없습니다.
//    - start : 과제의 시작 시각을 나타냅니다.
//      - "hh:mm"의 형태로 "00:00" ~ "23:59" 사이의 시간값만 들어가 있습니다.
//      - 모든 과제의 시작 시각은 달라서 겹칠 일이 없습니다.
//      - 과제는 "00:00" ... "23:59" 순으로 시작하면 됩니다. 즉, 시와 분의 값이 작을수록 더 빨리 시작한 과제입니다.
//    - playtime : 과제를 마치는데 걸리는 시간을 의미하며, 단위는 분입니다.
//      - 1 ≤ playtime ≤ 100
//      - playtime은 0으로 시작하지 않습니다.
//    - 배열은 시간순으로 정렬되어 있지 않을 수 있습니다.
// 2. 진행중이던 과제가 끝나는 시각과 새로운 과제를 시작해야하는 시각이 같은 경우 진행중이던 과제는 끝난 것으로 판단합니다.

// 입출력 예
// plans	                                                                                                          result
// [["korean", "11:40", "30"], ["english", "12:10", "20"], ["math", "12:30", "40"]]	                                ["korean", "english", "math"]
// [["science", "12:40", "50"], ["music", "12:20", "40"], ["history", "14:00", "30"], ["computer", "12:30", "100"]]	["science", "history", "computer", "music"]
// [["aaa", "12:00", "20"], ["bbb", "12:10", "30"], ["ccc", "12:40", "10"]]	                                        ["bbb", "ccc", "aaa"]

// 조금 복잡하게 푼 것 같다.
// solution1이 이번에 푼 풀이이고, solution2가 예전에 푼 풀이이다.
// 방식은 똑같은데, 이전 풀이가 더 함축적이어 보인다.

function solution1(plans) {
  const arr = plans
    .map((plan) => {
      const [h, m] = plan[1].split(":").map((v) => +v);
      return [plan[0], h * 60 + m, +plan[2]];
    })
    .sort((a, b) => {
      return a[1] - b[1];
    });

  const answer = [];
  const stack = [];
  stack.push(arr[0]);

  let time = arr[0][1];

  for (let i = 1; i <= arr.length; i++) {
    const next = arr[i];
    while (stack.length > 0) {
      let cur = stack.pop();
      if (!next) {
        answer.push(cur[0]);
        continue;
      }
      if (time + cur[2] <= next[1]) {
        time = time + cur[2];
        answer.push(cur[0]);
      } else {
        cur[2] = cur[2] - (next[1] - time);
        stack.push(cur);
        break;
      }
    }
    if (next) time = next[1];
    stack.push(next);
  }

  return answer;
}

function solution2(plans) {
  const stack = [];
  const answer = [];
  let cur = 0;
  plans = [...plans]
    .map((plan) => {
      const [h, m] = plan[1].split(":").map((v) => +v);
      plan[1] = h * 60 + m;
      plan[2] = Number(plan[2]);
      return plan;
    })
    .sort((a, b) => a[1] - b[1])
    .forEach((plan) => {
      let pre = stack.at(-1);
      while (pre) {
        if (plan[1] - cur < pre[2]) {
          pre[2] = pre[2] - (plan[1] - cur);
          break;
        } else {
          let temp = stack.pop();
          cur += temp[2];
          answer.push(temp[0]);
          pre = stack.at(-1);
        }
      }
      cur = plan[1];
      stack.push(plan);
    });

  return answer.concat(stack.map((s) => s[0]).reverse());
}

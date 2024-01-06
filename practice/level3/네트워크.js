// 문제 설명
// 네트워크란 컴퓨터 상호 간에 정보를 교환할 수 있도록 연결된 형태를 의미합니다.
// 예를 들어, 컴퓨터 A와 컴퓨터 B가 직접적으로 연결되어있고, 컴퓨터 B와 컴퓨터 C가 직접적으로 연결되어 있을 때
// 컴퓨터 A와 컴퓨터 C도 간접적으로 연결되어 정보를 교환할 수 있습니다.
// 따라서 컴퓨터 A, B, C는 모두 같은 네트워크 상에 있다고 할 수 있습니다.

// 컴퓨터의 개수 n, 연결에 대한 정보가 담긴 2차원 배열 computers가 매개변수로 주어질 때,
// 네트워크의 개수를 return 하도록 solution 함수를 작성하시오.

// 제한사항
// 1. 컴퓨터의 개수 n은 1 이상 200 이하인 자연수입니다.
// 2. 각 컴퓨터는 0부터 n-1인 정수로 표현합니다.
// 3. i번 컴퓨터와 j번 컴퓨터가 연결되어 있으면 computers[i][j]를 1로 표현합니다.
// 4. computer[i][i]는 항상 1입니다.

// 입출력 예
// n	computers	                        return
// 3	[[1, 1, 0], [1, 1, 0], [0, 0, 1]]	2
// 3	[[1, 1, 0], [1, 1, 1], [0, 1, 1]]	1

// 제한사항이 까다롭지 않아 생각보다 많이 간단한 문제이다.
// 예전에 풀었던 답안 역시 비슷하게 풀었는데, 다만 조금 복잡해보인다.
// 현재 답안이 훨씬 정리된 느낌이긴 하다.

function solution(n, computers) {
  const flag = [];
  let answer = 0;

  const dfs = (i) => {
    if (flag.includes(i)) return false;
    else {
      flag.push(i);
      for (let j = 0; j < n; j++) {
        if (i === j) continue;
        if (computers[i][j] === 1) dfs(j);
      }
      return true;
    }
  };

  for (let i = 0; i < n; i++) {
    if (dfs(i)) answer++;
  }

  return answer;
}

// 이전

function solution(n, computers) {
  const ch = computers.slice();
  const dfs = (L, 현재좌표) => {
    if (L === n) {
      return;
    } else {
      let [x, y] = 현재좌표;
      for (let k = 0; k < n; k++) {
        if (ch[y][k] !== 0) {
          ch[y][y] = 0;
          ch[k][k] = 0;
          ch[y][k] = 0;
          ch[k][y] = 0;
          dfs(L + 1, [y, k]);
        }
      }
    }
  };
  let 네트워크개수 = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (ch[i][j] !== 0) {
        ch[i][j] = 0;
        ch[j][i] = 0;
        dfs(0, [i, j]);
        네트워크개수++;
      }
    }
  }
  return 네트워크개수;
}

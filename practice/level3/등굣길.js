// 문제 설명
// 계속되는 폭우로 일부 지역이 물에 잠겼습니다.
// 물에 잠기지 않은 지역을 통해 학교를 가려고 합니다. 집에서 학교까지 가는 길은 m x n 크기의 격자모양으로 나타낼 수 있습니다.

// 격자의 크기 m, n과 물이 잠긴 지역의 좌표를 담은 2차원 배열 puddles이 매개변수로 주어집니다.
// 오른쪽과 아래쪽으로만 움직여 집에서 학교까지 갈 수 있는 최단경로의 개수를 1,000,000,007로 나눈 나머지를 return 하도록 solution 함수를 작성해주세요.

// 제한사항
// 격자의 크기 m, n은 1 이상 100 이하인 자연수입니다.
// m과 n이 모두 1인 경우는 입력으로 주어지지 않습니다.
// 물에 잠긴 지역은 0개 이상 10개 이하입니다.
// 집과 학교가 물에 잠긴 경우는 입력으로 주어지지 않습니다.

// 입출력 예
// m	n	puddles	  return
// 4	3	[[2, 2]]	4

function solution(m, n, puddles) {
  const flag = Array.from({ length: n }, () => Array.from({ length: m }, () => 1));

  puddles.forEach(([x, y]) => {
    flag[y - 1][x - 1] = "puddle";
  });

  let isZero = false;
  for (let k = 0; k < m; k++) {
    if (flag[0][k] === "puddle") isZero = true;
    if (isZero) flag[0][k] = 0;
  }
  isZero = false;
  for (let l = 0; l < n; l++) {
    if (flag[l][0] === "puddle") isZero = true;
    if (isZero) flag[l][0] = 0;
  }

  for (let i = 1; i < n; i++) {
    for (let j = 1; j < m; j++) {
      let res = 0;
      if (flag[i][j] === "puddle") res = 0;
      else res = flag[i][j - 1] + flag[i - 1][j];

      flag[i][j] = res % 1000000007;
    }
  }

  return flag[n - 1][m - 1];
}

// DP를 활용할 수 있는 최적의 문제이다.
// 가장자리의 격자는 이미 경우의 수가 하나밖에 없기 때문에 해당 값으로 flag를 채운 후
// 가장자리의 웅덩이가 존재하는 경우만 예외처리해주면 된다.
// 각 격자는 웅덩이이지 않은 이상, 위의 격자와 왼쪽 격자의 합이 경우의 수가 된다.

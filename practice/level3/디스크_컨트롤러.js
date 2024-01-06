// 문제 설명
// 하드디스크는 한 번에 하나의 작업만 수행할 수 있습니다.
// 디스크 컨트롤러를 구현하는 방법은 여러 가지가 있습니다.
// 가장 일반적인 방법은 요청이 들어온 순서대로 처리하는 것입니다.

// 각 작업에 대해 [작업이 요청되는 시점, 작업의 소요시간]을 담은 2차원 배열 jobs가 매개변수로 주어질 때,
// 작업의 요청부터 종료까지 걸린 시간의 평균을 가장 줄이는 방법으로 처리하면
// 평균이 얼마가 되는지 return 하도록 solution 함수를 작성해주세요.
// (단, 소수점 이하의 수는 버립니다)

// 제한 사항
// jobs의 길이는 1 이상 500 이하입니다.
// jobs의 각 행은 하나의 작업에 대한 [작업이 요청되는 시점, 작업의 소요시간] 입니다.
// 각 작업에 대해 작업이 요청되는 시간은 0 이상 1,000 이하입니다.
// 각 작업에 대해 작업의 소요시간은 1 이상 1,000 이하입니다.
// 하드디스크가 작업을 수행하고 있지 않을 때에는 먼저 요청이 들어온 작업부터 처리합니다.

// 입출력 예
// jobs	                    return
// [[0, 3], [1, 9], [2, 6]]	9

function solution(jobs) {
  const dic = Array.from({ length: jobs.length }, () => false);
  let curT = 0;
  let answer = 0;

  jobs.sort((a, b) => {
    if (a[0] === b[0]) return a[1] - b[1];
    return a[0] - b[0];
  });

  while (dic.some((d) => d === false)) {
    let flag = false;
    let val = Infinity;
    let idx = 0;
    for (let i = 0; i < jobs.length; i++) {
      if (dic[i]) continue;
      if (jobs[i][0] <= curT && val > jobs[i][1]) {
        idx = i;
        val = jobs[i][1];
        flag = true;
      }
    }

    while (!flag) {
      if (!dic[idx]) break;
      idx++;
    }

    if (jobs[idx][0] > curT) curT = jobs[idx][0] + jobs[idx][1];
    else curT += jobs[idx][1];

    answer += curT - jobs[idx][0];
    dic[idx] = true;
  }

  return Math.floor(answer / jobs.length);
}

// 평균시간을 줄이는 방법은 jobs의 요소들이 대기하는 시간을 줄이는 방법이다.
// jobs의 길이 500 밖에 되지 않으므로 log n**2 의 시간복잡도를 가져도 무관하다.

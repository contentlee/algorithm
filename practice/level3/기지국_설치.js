// 문제 설명
// N개의 아파트가 일렬로 쭉 늘어서 있습니다.
// 이 중에서 일부 아파트 옥상에는 4g 기지국이 설치되어 있습니다.
// 기술이 발전해 5g 수요가 높아져 4g 기지국을 5g 기지국으로 바꾸려 합니다.
// 그런데 5g 기지국은 4g 기지국보다 전달 범위가 좁아, 4g 기지국을 5g 기지국으로 바꾸면 어떤 아파트에는 전파가 도달하지 않습니다.

// 이때, 우리는 5g 기지국을 최소로 설치하면서 모든 아파트에 전파를 전달하려고 합니다.
// 아파트의 개수 N, 현재 기지국이 설치된 아파트의 번호가 담긴 1차원 배열 stations, 전파의 도달 거리 W가 매개변수로 주어질 때,
// 모든 아파트에 전파를 전달하기 위해 증설해야 할 기지국 개수의 최솟값을 리턴하는 solution 함수를 완성해주세요

// 제한사항
//  - N: 200,000,000 이하의 자연수
//  - stations의 크기: 10,000 이하의 자연수
//  - stations는 오름차순으로 정렬되어 있고, 배열에 담긴 수는 N보다 같거나 작은 자연수입니다.
//  - W: 10,000 이하의 자연수

// 입출력 예
// N	stations	W	answer
// 11	[4, 11]	  1	3
// 16	[9]	      2	3

function solution(n, stations, w) {
  var answer = 0;
  let cur = 1;
  const distance = w * 2 + 1;

  stations.forEach((station) => {
    const sw = station - w - cur;
    if (sw > 0) answer += Math.ceil(sw / distance);
    cur = station + w + 1;
  });

  const sw = n - stations[stations.length - 1] - w;
  if (n > 0) answer += Math.ceil(sw / distance);

  return answer;
}

// 입력되는 N의 최대 크기가 크다보니 반복의 횟수를 줄이는 것이 중요하다.
// statation의 각 위치를 방문하며 이전까지 필요한 기지국의 수를 구한다.
// 마지막으로 배열의 마지막 요소 이후로 남아있는 기지국 수를 구한다.

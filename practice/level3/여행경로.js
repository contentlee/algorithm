// 문제 설명
// 주어진 항공권을 모두 이용하여 여행경로를 짜려고 합니다. 항상 "ICN" 공항에서 출발합니다.

// 항공권 정보가 담긴 2차원 배열 tickets가 매개변수로 주어질 때,
// 방문하는 공항 경로를 배열에 담아 return 하도록 solution 함수를 작성해주세요.

// 제한사항
// 1. 모든 공항은 알파벳 대문자 3글자로 이루어집니다.
// 2. 주어진 공항 수는 3개 이상 10,000개 이하입니다.
// 3. tickets의 각 행 [a, b]는 a 공항에서 b 공항으로 가는 항공권이 있다는 의미입니다.
// 4. 주어진 항공권은 모두 사용해야 합니다.
// 5. 만일 가능한 경로가 2개 이상일 경우 알파벳 순서가 앞서는 경로를 return 합니다.
// 6. 모든 도시를 방문할 수 없는 경우는 주어지지 않습니다.

// 입출력 예
// tickets	                                                                        return
// [["ICN", "JFK"], ["HND", "IAD"], ["JFK", "HND"]]	                                ["ICN", "JFK", "HND", "IAD"]
// [["ICN", "SFO"], ["ICN", "ATL"], ["SFO", "ATL"], ["ATL", "ICN"], ["ATL","SFO"]]	["ICN", "ATL", "ICN", "SFO", "ATL", "SFO"]

// 테스트케이스 4번이 틀려서 의아했는데, 문제자체에 무조건 ICN에서 시작한다는 조건이 있다는걸 깜빡했다.
// 예외처리로 해결은 했지만, 함수가 정리되지 않은 느낌이라 정리를 해보는 것도 좋을 듯.

function solution(tickets) {
  tickets.sort((a, b) => (a[1] > b[1] ? 1 : -1));
  let answer = [];
  const flag = Array.from({ length: tickets.length }, () => false);

  const dfs = (count, arr) => {
    if (answer.length > 0) return;
    if (count === tickets.length) {
      answer = arr;
    } else {
      for (let i = 0; i < tickets.length; i++) {
        if (flag[i]) continue;

        flag[i] = true;
        if (tickets[i][0] === arr[arr.length - 1]) {
          dfs(count + 1, [...arr, tickets[i][1]]);
        }
        flag[i] = false;
      }
    }
  };

  for (let j = 0; j < tickets.length; j++) {
    if (answer.length > 0) break;
    if (tickets[j][0] !== "ICN") continue;
    flag[j] = true;
    dfs(1, [...tickets[j]]);
    flag[j] = false;
  }
  return answer;
}

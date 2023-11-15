// 카카오톡에서는 이모티콘을 무제한으로 사용할 수 있는 이모티콘 플러스 서비스 가입자 수를 늘리려고 합니다.
// 이를 위해 카카오톡에서는 이모티콘 할인 행사를 하는데, 목표는 다음과 같습니다.

// 이모티콘 플러스 서비스 가입자를 최대한 늘리는 것.
// 이모티콘 판매액을 최대한 늘리는 것.
// 1번 목표가 우선이며, 2번 목표가 그 다음입니다.

// 이모티콘 할인 행사는 다음과 같은 방식으로 진행됩니다.

// n명의 카카오톡 사용자들에게 이모티콘 m개를 할인하여 판매합니다.
// 이모티콘마다 할인율은 다를 수 있으며, 할인율은 10%, 20%, 30%, 40% 중 하나로 설정됩니다.
// 카카오톡 사용자들은 다음과 같은 기준을 따라 이모티콘을 사거나, 이모티콘 플러스 서비스에 가입합니다.

// 각 사용자들은 자신의 기준에 따라 일정 비율 이상 할인하는 이모티콘을 모두 구매합니다.
// 각 사용자들은 자신의 기준에 따라 이모티콘 구매 비용의 합이 일정 가격 이상이 된다면,
// 이모티콘 구매를 모두 취소하고 이모티콘 플러스 서비스에 가입합니다.

// 카카오톡 사용자 n명의 구매 기준을 담은 2차원 정수 배열 users,
// 이모티콘 m개의 정가를 담은 1차원 정수 배열 emoticons가 주어집니다.
// 이때, 행사 목적을 최대한으로 달성했을 때의 이모티콘 플러스 서비스 가입 수와 이모티콘 매출액을
// 1차원 정수 배열에 담아 return 하도록 solution 함수를 완성해주세요.

// 제한사항
// 1. 1 ≤ users의 길이 = n ≤ 100
//  - users의 원소는 [비율, 가격]의 형태입니다.
//  - users[i]는 i+1번 고객의 구매 기준을 의미합니다.
//  - 비율% 이상의 할인이 있는 이모티콘을 모두 구매한다는 의미입니다.
//    - 1 ≤ 비율 ≤ 40
//  - 가격이상의 돈을 이모티콘 구매에 사용한다면, 이모티콘 구매를 모두 취소하고 이모티콘 플러스 서비스에 가입한다는 의미입니다.
//    - 100 ≤ 가격 ≤ 1,000,000
//    - 가격은 100의 배수입니다.
// 2. 1 ≤ emoticons의 길이 = m ≤ 7
//  - emoticons[i]는 i+1번 이모티콘의 정가를 의미합니다.
//  - 100 ≤ emoticons의 원소 ≤ 1,000,000
//  - emoticons의 원소는 100의 배수입니다.

// 입출력 예
// users	                                                                              emoticons	                result
// [[40, 10000], [25, 10000]]	                                                          [7000, 9000]	            [1, 5400]
// [[40, 2900], [23, 10000], [11, 5200], [5, 5900], [40, 3100], [27, 9200], [32, 6900]]	[1300, 1500, 1600, 4900]	[4, 13860]

// 1년 전만 해도 전혀 감이 안왔던 문제인데, 생각보다 금방 풀었다.
// 그냥 무지성 완전탐색이다..!

function solution(users, emoticons) {
  const answer = [];
  const mkNextArr = (arr, price, discount) => {
    return arr.map((v, i) => {
      if (discount * 10 >= users[i][0]) {
        return v + price - price * (discount / 10);
      }
      return v;
    });
  };

  const mkRes = (arr) => {
    return arr.reduce(
      (acc, cur, i) => {
        if (cur >= users[i][1]) return [acc[0] + 1, acc[1]];
        return [acc[0], acc[1] + cur];
      },
      [0, 0]
    );
  };

  const dfs = (idx, arr) => {
    if (idx === emoticons.length) {
      const res = mkRes(arr);
      answer.push(res);
    } else {
      for (let i = 1; i < 5; i++) {
        const nextArr = mkNextArr(arr, emoticons[idx], i);
        dfs(idx + 1, nextArr);
      }
    }
  };

  dfs(
    0,
    Array.from({ length: users.length }, () => 0)
  );

  answer.sort((a, b) => {
    if (a[0] === b[0]) return b[1] - a[1];
    return b[0] - a[0];
  });

  return answer[0];
}

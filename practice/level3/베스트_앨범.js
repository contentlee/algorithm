// 문제 설명
// 스트리밍 사이트에서 장르 별로 가장 많이 재생된 노래를 두 개씩 모아 베스트 앨범을 출시하려 합니다.
// 노래는 고유 번호로 구분하며, 노래를 수록하는 기준은 다음과 같습니다.

// - 속한 노래가 많이 재생된 장르를 먼저 수록합니다.
// - 장르 내에서 많이 재생된 노래를 먼저 수록합니다.
// - 장르 내에서 재생 횟수가 같은 노래 중에서는 고유 번호가 낮은 노래를 먼저 수록합니다.

// 노래의 장르를 나타내는 문자열 배열 genres와 노래별 재생 횟수를 나타내는 정수 배열 plays가 주어질 때,
// 베스트 앨범에 들어갈 노래의 고유 번호를 순서대로 return 하도록 solution 함수를 완성하세요.

// 제한사항
// genres[i]는 고유번호가 i인 노래의 장르입니다.
// plays[i]는 고유번호가 i인 노래가 재생된 횟수입니다.
// genres와 plays의 길이는 같으며, 이는 1 이상 10,000 이하입니다.
// 장르 종류는 100개 미만입니다.
// 장르에 속한 곡이 하나라면, 하나의 곡만 선택합니다.
// 모든 장르는 재생된 횟수가 다릅니다.

// 입출력 예
// genres 	                                        plays	                      return
// ["classic", "pop", "classic", "classic", "pop"]	[500, 600, 150, 800, 2500]	[4, 1, 3, 0]

function solution(genres, plays) {
  const dic = {};
  genres.forEach((gen, i) => {
    dic[gen] = dic[gen] ? dic[gen] + plays[i] : plays[i];
  });

  const flag = {};
  return genres
    .map((gen, i) => {
      return { idx: i, genre: gen, play: plays[i] };
    })
    .sort((a, b) => {
      if (a.genre === b.genre) return b.play - a.play;
      return dic[b.genre] - dic[a.genre];
    })
    .filter(({ genre }) => {
      if (flag[genre] && flag[genre] >= 2) return false;
      if (!flag[genre]) flag[genre] = 0;
      flag[genre]++;
      return true;
    })
    .map(({ idx }) => {
      return idx;
    });
}

// 정렬만 잘하면 해결되는 문제이다. 크게 어려운 점은 없다.
// 굳이 정렬할 때의 특이점을 꼽자면 dic 에 장르별 재생 횟수를 담아
// dic에 따라 genres가 정렬되게 한 점이다.

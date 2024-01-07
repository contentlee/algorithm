// 문제 설명
// 고고학자인 "튜브"는 고대 유적지에서 보물과 유적이 가득할 것으로 추정되는 비밀의 문을 발견하였습니다.
// 그런데 문을 열려고 살펴보니 특이한 형태의 자물쇠로 잠겨 있었고
// 문 앞에는 특이한 형태의 열쇠와 함께 자물쇠를 푸는 방법에 대해 다음과 같이 설명해 주는 종이가 발견되었습니다.

// 잠겨있는 자물쇠는 격자 한 칸의 크기가 1 x 1인 N x N 크기의 정사각 격자 형태이고
// 특이한 모양의 열쇠는 M x M 크기인 정사각 격자 형태로 되어 있습니다.

// 자물쇠에는 홈이 파여 있고 열쇠 또한 홈과 돌기 부분이 있습니다.
// 열쇠는 회전과 이동이 가능하며 열쇠의 돌기 부분을 자물쇠의 홈 부분에 딱 맞게 채우면 자물쇠가 열리게 되는 구조입니다.
// 자물쇠 영역을 벗어난 부분에 있는 열쇠의 홈과 돌기는 자물쇠를 여는 데 영향을 주지 않지만,
// 자물쇠 영역 내에서는 열쇠의 돌기 부분과 자물쇠의 홈 부분이 정확히 일치해야 하며 열쇠의 돌기와 자물쇠의 돌기가 만나서는 안됩니다.
// 또한 자물쇠의 모든 홈을 채워 비어있는 곳이 없어야 자물쇠를 열 수 있습니다.

// 열쇠를 나타내는 2차원 배열 key와 자물쇠를 나타내는 2차원 배열 lock이 매개변수로 주어질 때,
// 열쇠로 자물쇠를 열수 있으면 true를, 열 수 없으면 false를 return 하도록 solution 함수를 완성해주세요.

// 제한사항
// - key는 M x M(3 ≤ M ≤ 20, M은 자연수)크기 2차원 배열입니다.
// - lock은 N x N(3 ≤ N ≤ 20, N은 자연수)크기 2차원 배열입니다.
// - M은 항상 N 이하입니다.
// - key와 lock의 원소는 0 또는 1로 이루어져 있습니다.
// - 0은 홈 부분, 1은 돌기 부분을 나타냅니다.

// 입출력 예
// key	                              lock	                            result
// [[0, 0, 0], [1, 0, 0], [0, 1, 1]]	[[1, 1, 1], [1, 1, 0], [1, 0, 1]]	true

function solution(key, lock) {
  const rotate = (x, y, length) => {
    return [length - 1 - y, x];
  };

  const check = (arr) => {
    return arr.every(([x, y]) => lock[y][x] === 0);
  };

  const dol = [];
  for (let i = 0; i < key.length; i++) {
    for (let j = 0; j < key.length; j++) {
      if (key[i][j] === 1) dol.push([j, i]);
    }
  }

  const hom = [];
  for (let i = 0; i < lock.length; i++) {
    for (let j = 0; j < lock.length; j++) {
      if (lock[i][j] === 0) hom.push([j, i]);
    }
  }

  const dic = [dol];
  for (let k = 0; k < 3; k++) {
    const tmp = dic[dic.length - 1].map(([x, y]) => {
      return rotate(x, y, key.length);
    });
    dic.push(tmp);
  }

  let answer = false;
  let curDic = 0;
  while (curDic < dic.length && !answer) {
    for (let i = 0; i < lock.length; i++) {
      if (answer) break;
      for (let j = 0; j < lock.length; j++) {
        const tmp = dic[curDic].map(([x, y]) => [x + i, y + j]).filter(([x, y]) => x < lock.length && y < lock.length);
        if (tmp.length === hom.length) {
          if (check(tmp)) {
            answer = true;
            break;
          }
        }
      }
    }

    for (let i = 0; i < lock.length; i++) {
      if (answer) break;
      for (let j = 0; j < lock.length; j++) {
        const tmp = dic[curDic].map(([x, y]) => [x - i, y - j]).filter(([x, y]) => x > -1 && y > -1);
        if (tmp.length === hom.length) {
          if (check(tmp)) {
            answer = true;
            break;
          }
        }
      }
    }

    for (let i = 0; i < lock.length; i++) {
      if (answer) break;
      for (let j = 0; j < lock.length; j++) {
        const tmp = dic[curDic].map(([x, y]) => [x + i, y - j]).filter(([x, y]) => x < lock.length && y > -1);
        if (tmp.length === hom.length) {
          if (check(tmp)) {
            answer = true;
            break;
          }
        }
      }
    }

    for (let i = 0; i < lock.length; i++) {
      if (answer) break;
      for (let j = 0; j < lock.length; j++) {
        const tmp = dic[curDic].map(([x, y]) => [x - i, y + j]).filter(([x, y]) => x > -1 && y < lock.length);
        if (tmp.length === hom.length) {
          if (check(tmp)) {
            answer = true;
            break;
          }
        }
      }
    }

    curDic++;
  }

  return answer;
}

// 해당 문제는 두 가지 동작만을 수행하면 된다.
// 열쇠를 회전시키기, 열쇠를 자물쇠에 맞춰보기
// 열쇠를 맞춰보는 동작에서 추상화가 필요하긴 하지만
// 시간복잡도에 있어서 크게 나쁘지 않은 선택이긴 하다.

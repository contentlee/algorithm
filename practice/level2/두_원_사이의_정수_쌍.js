// 문제 설명
// x축과 y축으로 이루어진 2차원 직교 좌표계에 중심이 원점인 서로 다른 크기의 원이
// 두 개 주어집니다. 반지름을 나타내는 두 정수 r1, r2가 매개변수로 주어질 때,
// 두 원 사이의 공간에 x좌표와 y좌표가 모두 정수인 점의 개수를 return하도록
// solution 함수를 완성해주세요.

// ※ 각 원 위의 점도 포함하여 셉니다.

// 제한 사항
// 1. 1 ≤ r1 < r2 ≤ 1,000,000

// 입출력 예
// r1	  r2	result
// 2	  3	  20

// solution1의 경우 모든 점들을 순회하다보니 타임오버가 나온다.
// solution2처럼 각 y 값에 나오는 x의 최대값과 최소값을 구한 후,
// 해당 값으로 개수를 구하는게 효율성이 좋아진다.
// 사분면이 반복되므로, x가 0일 때는 구하지 않아야 한다.

function solution1(r1, r2) {
  let answer = 0;

  let next = r2;
  let cur = r2;

  const min = r1 ** 2;
  const max = r2 ** 2;

  for (let i = 0; i < r2; i++) {
    cur = next;
    while (cur > 0) {
      const val = cur ** 2 + i ** 2;

      if (val < min) break;

      if (val > max) {
        cur--;
        next--;
        continue;
      }

      answer++;
      cur--;
    }
  }
  return answer * 4;
}

function solution2(r1, r2) {
  let answer = 0;

  let prevS = r2;
  let prevE = r1;

  const min = r1 ** 2;
  const max = r2 ** 2;

  for (let i = 0; i < r2; i++) {
    let valS = i ** 2 + prevS ** 2;

    while (valS > max) {
      prevS--;
      valS = i ** 2 + prevS ** 2;
    }

    while (prevE > 1) {
      const valE = i ** 2 + (prevE - 1) ** 2;
      if (valE < min) break;
      prevE--;
    }

    answer += prevS - prevE + 1;
  }
  return answer * 4;
}

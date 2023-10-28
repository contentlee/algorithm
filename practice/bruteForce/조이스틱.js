// 문제 설명
// 조이스틱으로 알파벳 이름을 완성하세요. 맨 처음엔 A로만 이루어져 있습니다.
// ex) 완성해야 하는 이름이 세 글자면 AAA, 네 글자면 AAAA

// 조이스틱을 각 방향으로 움직이면 아래와 같습니다.

// ▲ - 다음 알파벳
// ▼ - 이전 알파벳 (A에서 아래쪽으로 이동하면 Z로)
// ◀ - 커서를 왼쪽으로 이동 (첫 번째 위치에서 왼쪽으로 이동하면 마지막 문자에 커서)
// ▶ - 커서를 오른쪽으로 이동 (마지막 위치에서 오른쪽으로 이동하면 첫 번째 문자에 커서)

// 예를 들어 아래의 방법으로 "JAZ"를 만들 수 있습니다.

// - 첫 번째 위치에서 조이스틱을 위로 9번 조작하여 J를 완성합니다.
// - 조이스틱을 왼쪽으로 1번 조작하여 커서를 마지막 문자 위치로 이동시킵니다.
// - 마지막 위치에서 조이스틱을 아래로 1번 조작하여 Z를 완성합니다.

// 따라서 11번 이동시켜 "JAZ"를 만들 수 있고, 이때가 최소 이동입니다.
// 만들고자 하는 이름 name이 매개변수로 주어질 때, 이름에 대해 조이스틱 조작 횟수의 최솟값을 return 하도록 solution 함수를 만드세요.

// 제한사항
// 1. name은 알파벳 대문자로만 이루어져 있습니다.
// 2. name의 길이는 1 이상 20 이하입니다.

// 입출력 예
// name	    return
// "JEROEN"	56
// "JAN"	  23

// 이 문제 역시 제한사항이 별로 많지 않아 bfs로 풀었다.
// visited와 같은 flag를 둔다면, 효율성이 조금 향상될 것 같다.
// 마지막에 -1을 한 이유는 queue에 해당 답이 담겨지며, 불필요하게 val에 +1이 포함되기 때문이다.
// 더불어서 name 자체가 A로만 이루어질 경우, 답이 -1로 반환된다. 그러므로 답이 0일 때는 예외처리를 해줘야 한다.

// ascii 65~90(A~Z)

function solution(name) {
  var answer = Infinity;
  const arr = Array.from({ length: name.length }, () => "A");
  const flag = Array.from({ length: name.length }, () => 0);
  const makeAlphabet = (alphabet) => {
    const val = alphabet.charCodeAt();
    if (val > 78) {
      return 90 - val + 1;
    } else {
      return val - 65;
    }
  };

  const queue = [];
  queue.push({ idx: 0, arr, val: 0 });

  while (queue.length) {
    const { idx, arr, val } = queue.shift();
    if (arr.join("") === name) {
      answer = val;
      break;
    }

    const alphabet = name[idx];
    const times = arr[idx] === "A" ? makeAlphabet(alphabet) : 0;
    const next = [...arr];

    next[idx] = alphabet;
    const nextR = idx + 1 >= arr.length ? 0 : idx + 1;
    const nextL = idx - 1 < 0 ? arr.length - 1 : idx - 1;
    queue.push({ idx: nextR, arr: next, val: val + times + 1 });
    queue.push({ idx: nextL, arr: next, val: val + times + 1 });
  }

  return answer === 0 ? 0 : answer - 1;
}

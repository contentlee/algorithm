// 문제 설명
// 두 개의 단어 begin, target과 단어의 집합 words가 있습니다.
// 아래와 같은 규칙을 이용하여 begin에서 target으로 변환하는 가장 짧은 변환 과정을 찾으려고 합니다.

// 1. 한 번에 한 개의 알파벳만 바꿀 수 있습니다.
// 2. words에 있는 단어로만 변환할 수 있습니다.
// 예를 들어 begin이 "hit", target가 "cog", words가
// ["hot","dot","dog","lot","log","cog"]라면 "hit" -> "hot" -> "dot" -> "dog" -> "cog"와 같이
// 4단계를 거쳐 변환할 수 있습니다.

// 두 개의 단어 begin, target과 단어의 집합 words가 매개변수로 주어질 때,
// 최소 몇 단계의 과정을 거쳐 begin을 target으로 변환할 수 있는지 return 하도록 solution 함수를 작성해주세요.

// 제한사항
// 1. 각 단어는 알파벳 소문자로만 이루어져 있습니다.
// 2. 각 단어의 길이는 3 이상 10 이하이며 모든 단어의 길이는 같습니다.
// 3. words에는 3개 이상 50개 이하의 단어가 있으며 중복되는 단어는 없습니다.
// 4. begin과 target은 같지 않습니다.
// 5. 변환할 수 없는 경우에는 0를 return 합니다.

// 입출력 예
// begin	target	words	                                      return
// "hit"	"cog"	  ["hot", "dot", "dog", "lot", "log", "cog"]	4
// "hit"	"cog"	  ["hot", "dot", "dog", "lot", "log"]	        0

// 이번에도 queue를 따로 만들어서 풀었다. 시간복잡도에 있어 훨씬 효율이 있어 만드는게 좋은 것 같다.
// 이전에 풀었던 방식에서는 문자 간의 이동 가능성에 대한 부분에서 약간의 비효율이 보였다.

class Node {
  constructor(val) {
    this.value = val;
    this.next = null;
  }
}

class Queue {
  head = null;
  tail = null;
  length = 0;

  enqueue(val) {
    const node = new Node(val);
    if (this.length === 0) {
      this.head = node;
      this.tail = node;
      this.length++;
      return;
    }

    this.tail.next = node;
    this.tail = node;
    this.length++;
  }

  dequeue() {
    const res = this.head;
    const next = this.head.next;

    if (this.length === 1 || this.length === 2) {
      this.tail = next;
    }

    this.head = next;
    this.length--;
    return res;
  }
}

const comparison = (w1, w2) => {
  let count = 0;

  for (let i = 0; i < w1.length; i++) {
    if (w1[i] !== w2[i]) count++;
  }

  if (count === 1) return true;
  return false;
};

function solution(begin, target, words) {
  if (!words.includes(target)) return 0;
  let answer = 0;
  let flag = Array.from({ length: words.length }, () => false);

  const queue = new Queue();
  queue.enqueue({ cur: begin, count: 0 });
  while (queue.length) {
    const {
      value: { cur, count },
    } = queue.dequeue();
    if (cur === target) {
      answer = count;
      break;
    }
    for (let j = 0; j < words.length; j++) {
      if (flag[j]) continue;
      if (comparison(cur, words[j])) {
        flag[j] = true;
        queue.enqueue({ cur: words[j], count: count + 1 });
      }
    }
  }

  return answer;
}

// 이전
function solution(begin, target, words) {
  words.unshift(begin);
  const ch = Array(target.length).fill(0);
  const lv = Array(target.length).fill(0);
  const queue = [];

  ch[0] = 1;
  lv[0] = 0;
  queue.push(0);
  const 목표인덱스 = words.indexOf(target);
  const 차이값 = (글자1, 글자2) => {
    let 글자배열1 = [...글자1];
    let 글자배열2 = [...글자2];
    let 차이 = 0;
    for (let i = 0; i < 글자배열1.length; i++) {
      if (차이 > 1) break;
      if (글자배열1[i] !== 글자배열2[i]) {
        차이++;
      }
    }
    return 차이;
  };
  let 정답 = 0;
  while (queue.length) {
    if (!목표인덱스) break;
    const 인덱스 = queue.shift();
    if (목표인덱스 === 인덱스) {
      정답 = lv[인덱스];
      break;
    }
    for (let j = 0; j < words.length; j++) {
      if (ch[j] !== 1 && 차이값(words[j], words[인덱스]) === 1) {
        queue.push(j);
        ch[j] = 1;
        lv[j] = lv[인덱스] + 1;
      }
    }
  }
  return 정답;
}

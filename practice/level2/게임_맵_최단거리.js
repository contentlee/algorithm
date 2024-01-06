// 문제 설명
// ROR 게임은 두 팀으로 나누어서 진행하며, 상대 팀 진영을 먼저 파괴하면 이기는 게임입니다.
// 따라서, 각 팀은 상대 팀 진영에 최대한 빨리 도착하는 것이 유리합니다.
// 만약, 상대 팀이 자신의 팀 진영 주위에 벽을 세워두었다면 상대 팀 진영에 도착하지 못할 수도 있습니다.

// 게임 맵의 상태 maps가 매개변수로 주어질 때,
// 캐릭터가 상대 팀 진영에 도착하기 위해서 지나가야 하는 칸의 개수의 최솟값을 return 하도록 solution 함수를 완성해주세요.
// 단, 상대 팀 진영에 도착할 수 없을 때는 -1을 return 해주세요.

// 제한사항
// 1. maps는 n x m 크기의 게임 맵의 상태가 들어있는 2차원 배열로, n과 m은 각각 1 이상 100 이하의 자연수입니다.
// 2. n과 m은 서로 같을 수도, 다를 수도 있지만, n과 m이 모두 1인 경우는 입력으로 주어지지 않습니다.
// 3. maps는 0과 1로만 이루어져 있으며, 0은 벽이 있는 자리, 1은 벽이 없는 자리를 나타냅니다.
// 4. 처음에 캐릭터는 게임 맵의 좌측 상단인 (1, 1) 위치에 있으며, 상대방 진영은 게임 맵의 우측 하단인 (n, m) 위치에 있습니다.

// 입출력 예
// maps	                                                          answer
// [[1,0,1,1,1],[1,0,1,0,1],[1,0,1,1,1],[1,1,1,0,1],[0,0,0,0,1]]	11
// [[1,0,1,1,1],[1,0,1,0,1],[1,0,1,1,1],[1,1,1,0,0],[0,0,0,0,1]]	-1

// js의 array 만으로 queue를 구현하면, splice로 인해 시간복잡도가 높아진다.
// 이를 방지하기 위해 class로 queue를 구현하였다.
// 이전에 풀었던 방식은 queue를 splice로 출력하지 않고, push와 index로 쌓아가며 배열을 순회하는 방식이었다.
// 하지만 공간 복잡도의 측면에서 queue를 계속해서 비워주는 방식이 장기적으로 좋을 것이다.

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
    if (!this.head) {
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
    if (!this.head) return;
    const res = this.head;
    const next = this.head.next;

    res.next = null;

    if (this.length === 1) {
      this.head = null;
      this.tail = null;
      this.length--;
    } else if (this.length === 2) {
      this.head = next;
      this.tail = next;
      this.length--;
    } else {
      this.head = next;
      this.length--;
    }

    return res;
  }
}

const direction = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

function solution(maps) {
  var answer = -1;

  const flag = Array.from({ length: maps.length }, () => Array.from({ length: maps[0].length }, () => false));
  const queue = new Queue();
  queue.enqueue({ x: 0, y: 0, count: 0 });
  while (queue.length) {
    const { value } = queue.dequeue();
    const { x, y, count } = value;

    if (flag[y][x]) continue;
    if (x === flag[0].length - 1 && y === flag.length - 1) {
      answer = count + 1;
      break;
    }

    for (let i = 0; i < 4; i++) {
      const [tempX, tempY] = [x + direction[i][0], y + direction[i][1]];
      if (tempX >= 0 && tempX < maps[0].length && tempY >= 0 && tempY < maps.length && maps[tempY][tempX] === 1) {
        queue.enqueue({ x: tempX, y: tempY, count: count + 1 });
      }
    }
    flag[y][x] = true;
  }
  return answer;
}

// 이전

function solution(maps) {
  const dir = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];
  const flag = Array.from({ length: maps.length }, () => Array.from({ length: maps[0].length }, () => false));

  const queue = [{ coor: [0, 0], count: 1 }];
  let index = 0;

  while (queue.length > 0 && index < queue.length) {
    let [x, y] = queue[index].coor;
    let count = queue[index].count;

    if (maps[x][y] !== 1 || flag[x][y]) {
      index++;
      continue;
    }

    if (x === maps.length - 1 && y === maps[0].length - 1) break;
    dir.forEach((arr) => {
      if (x + arr[0] >= 0 && x + arr[0] < maps.length && y + arr[1] >= 0 && y + arr[1] < maps[0].length) {
        queue.push({ coor: [x + arr[0], y + arr[1]], count: count + 1 });
      }
    });
    flag[x][y] = true;
    index++;
  }

  return queue[index] ? queue[index].count : -1;
}

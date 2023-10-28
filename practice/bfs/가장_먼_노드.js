// 문제 설명
// n개의 노드가 있는 그래프가 있습니다. 각 노드는 1부터 n까지 번호가 적혀있습니다.
// 1번 노드에서 가장 멀리 떨어진 노드의 갯수를 구하려고 합니다.
// 가장 멀리 떨어진 노드란 최단경로로 이동했을 때 간선의 개수가 가장 많은 노드들을 의미합니다.

// 노드의 개수 n, 간선에 대한 정보가 담긴 2차원 배열 vertex가 매개변수로 주어질 때,
// 1번 노드로부터 가장 멀리 떨어진 노드가 몇 개인지를 return 하도록 solution 함수를 작성해주세요.

// 제한사항
// 노드의 개수 n은 2 이상 20,000 이하입니다.
// 간선은 양방향이며 총 1개 이상 50,000개 이하의 간선이 있습니다.
// vertex 배열 각 행 [a, b]는 a번 노드와 b번 노드 사이에 간선이 있다는 의미입니다.

// 입출력 예
// n	vertex	                                                  return
// 6	[[3, 6], [4, 3], [3, 2], [1, 3], [1, 2], [2, 4], [5, 2]]	3

// 푸는 시간도 오래 걸렸지만, 클래스 문법으로 자료구조를 구현했던 걸 연습한다는 개념으로 풀어봤다.
// 이 문제는 전에도 풀었던 적이 있었는데 아래에 추가해보았다. 이전 답안이 효율성에 있어서는 확실히 떨어지긴 하다.

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
    if (this.length === 0) return null;

    const res = this.head;
    const next = this.head.next;

    if (!next) this.tail = null;

    this.head = next;
    this.length--;

    return res;
  }
}

class Graph {
  list = {};
  table = {};
  flag = {};

  addVertex(val) {
    if (!this.list[val]) this.list[val] = [];
  }

  addEdge(vertex1, vertex2) {
    if (!this.list[vertex1] || !this.list[vertex2]) return;
    this.list[vertex1].push(vertex2);
    this.list[vertex2].push(vertex1);
  }

  init() {
    const keys = Object.keys(this.list);
    keys.forEach((key) => {
      this.table[key] = Infinity;
      this.flag[key] = false;
    });
  }

  getDistances(start) {
    this.init();
    const queue = new Queue();
    queue.enqueue({ vertex: start, distance: 0 });
    while (queue.length) {
      const {
        value: { vertex, distance },
      } = queue.dequeue();
      if (this.flag[vertex]) continue;
      if (this.table[vertex] > distance) this.table[vertex] = distance;
      for (let i = 0; i < this.list[vertex].length; i++) {
        queue.enqueue({ vertex: this.list[vertex][i], distance: distance + 1 });
      }
      this.flag[vertex] = true;
    }
    return this.table;
  }

  getMaxs(obj) {
    const values = Object.values(obj);
    return values.reduce(
      (acc, cur) => {
        if (acc[0] < cur) return [cur, 1];
        else if (acc[0] === cur) return [cur, acc[1] + 1];
        else return acc;
      },
      [0, 0]
    )[1];
  }
}

function solution(n, edge) {
  const graph = new Graph();
  for (let i = 1; i <= n; i++) {
    graph.addVertex(i);
  }
  edge.forEach((e) => {
    graph.addEdge(e[0], e[1]);
  });

  return graph.getMaxs(graph.getDistances(1));
}

// 이전 답안
function solution2(n, edge) {
  let 체크배열 = Array(n + 1).fill(0);
  let 레벨 = Array(n + 1).fill(0);
  let queue = [];

  //init
  queue.push(1);
  체크배열[1] = 1;
  레벨[1] = 0;

  while (queue.length) {
    let 현재 = queue.shift();
    let 갈수있는경로 = edge.filter((꼭지점) => 꼭지점[0] === 현재 || 꼭지점[1] === 현재);
    if (!갈수있는경로) {
      continue;
    }
    for (let i = 0; i < 갈수있는경로.length; i++) {
      let 갈수있는번호 = 갈수있는경로[i][1] === 현재 ? 갈수있는경로[i][0] : 갈수있는경로[i][1];
      if (체크배열[갈수있는번호] === 0) {
        체크배열[갈수있는번호] = 1;
        레벨[갈수있는번호] = 레벨[현재] + 1;
        queue.push(갈수있는번호);
      }
    }
  }
  let 답 = 레벨.sort((a, b) => b - a).filter((값) => 레벨[0] === 값);

  return 답.length;
}

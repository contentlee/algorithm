import Graph from "../dataStructure/graph/WeightedGraph.js";
import PriorityQueue from "../dataStructure/queue/PriorityQueue.js";

class Dijkstra extends Graph {
  distances;
  previous;
  flag;

  init() {
    const keys = Object.keys(this.list);
    // node 간의 거리를 나타내는 객체
    this.distances = {};
    // 해당 node 이전에 방문해야하는 node를 나타내는 객체
    this.previous = {};
    // 해당 node의 방문 여부를 알려주는 객체
    this.flag = {};
    keys.forEach((key) => {
      this.distances[key] = Infinity;
      this.previous[key] = null;
      this.flag[key] = false;
    });
  }

  // 다익스트라 알고리즘은 출발점과 도착점을 정한 후 계산하여 거리값을 반환
  dijkstra(vertex1, vertex2) {
    if (!this.list[vertex1] || !this.list[vertex2]) return null;
    this.init();

    // 우선순위큐를 사용하는 이유
    const queue = new PriorityQueue();
    queue.enqueue({ node: { node: vertex1, prev: null }, priority: 0 });
    while (queue.length) {
      const {
        node: { node, prev },
        priority,
      } = queue.dequeue();
      if (this.flag[node]) continue;
      if (this.distances[node] > priority) {
        this.distances[node] = priority;
        this.previous[node] = prev;
      }

      if (node === vertex2) break;

      // this.list => 가중치 그래프(실제 거리를 보여주는 객체)
      // this.list[node] => 특정 node와 연결된 node를 담은 배열
      for (let i = 0; i < this.list[node].length; i++) {
        const value = this.list[node][i];
        queue.enqueue({ node: { node: value.node, prev: node }, priority: value.weight + priority });
      }
      this.flag[node] = true;
    }

    return this.distances[vertex2];
  }
}

const dijkstra = new Dijkstra();

dijkstra.addVertex("A");
dijkstra.addVertex("B");
dijkstra.addVertex("C");
dijkstra.addVertex("D");
dijkstra.addVertex("E");
dijkstra.addVertex("F");

dijkstra.addEdge("A", "B", 4);
dijkstra.addEdge("A", "C", 2);
dijkstra.addEdge("B", "E", 3);
dijkstra.addEdge("C", "D", 2);
dijkstra.addEdge("C", "F", 4);
dijkstra.addEdge("D", "E", 3);
dijkstra.addEdge("D", "F", 1);
dijkstra.addEdge("E", "F", 1);

console.log(dijkstra.dijkstra("A", "E"));

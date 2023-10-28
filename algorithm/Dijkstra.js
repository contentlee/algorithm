import Graph from "../dataStructure/graph/WeightedGraph.js";
import PriorityQueue from "../dataStructure/queue/PriorityQueue.js";

class Dijkstra extends Graph {
  distances;
  previous;
  flag;

  init() {
    const keys = Object.keys(this.list);
    this.distances = {};
    this.previous = {};
    this.flag = {};
    keys.forEach((key) => {
      this.distances[key] = Infinity;
      this.previous[key] = null;
      this.flag[key] = false;
    });
  }

  dijkstra(vertex1, vertex2) {
    if (!this.list[vertex1] || !this.list[vertex2]) return null;
    this.init();

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

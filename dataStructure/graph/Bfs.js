import Graph from "./UnWeightedGraph.js";
import Queue from "../queue/Queue.js";

class Bfs extends Graph {
  bfs(departure, arrive) {
    const queue = new Queue();
    const flag = {};
    const res = [];

    queue.enqueue({ val: departure, level: 0 });
    while (queue.length) {
      const {
        value: { val, level },
      } = queue.dequeue();
      if (flag[val]) continue;
      flag[val] = true;
      res.push(val);

      if (val === arrive) break;

      for (let i = 0; i < this.list[val].length; i++) {
        queue.enqueue({ val: this.list[val][i], level: level + 1 });
      }
    }

    return res;
  }
}

const graph = new Bfs();

graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");
graph.addVertex("D");
graph.addVertex("E");
graph.addVertex("F");

graph.addEdge("A", "B");
graph.addEdge("A", "C");
graph.addEdge("B", "D");
graph.addEdge("C", "E");
graph.addEdge("D", "E");
graph.addEdge("D", "F");
graph.addEdge("E", "F");

console.log(graph.bfs("A", "E"));

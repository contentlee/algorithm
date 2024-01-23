import Graph from "./UnWeightedGraph.js";

// 깊이우선탐색(Depth First Search)

// recursive
// The function should accept a starting node.
// Create a list to store the end result, to be returned at the very end.
// Create an object to store visited vertices.
// Create a helper function which accepts a vertex.
//  1. The helper function should return early if the vertex is empty.
//  2. The helper function should place the vertex it accepts into the visited object and push that vertex into the result array.
//  3. Loop over all of the values in the adjacenecyList for that vertex
//  4. If any of those values have not been visited, recursively invoke the helper function with that vertex
// Invoke the helper function with the starting vertex.
// Return the result array.

class Dfs extends Graph {
  min;
  flag;
  paths = [];

  arrive = undefined;

  init() {
    this.flag = {};
    const keys = Object.keys(this.list);
    keys.forEach((key) => (this.flag[key] = false));

    this.min = Infinity;

    this.paths = [];
  }

  dfs(departure, arrive) {
    this.arrive = arrive;
    this.init();
    this.recursive(0, departure, [departure]);

    return this.min;
  }

  recursive(val, cur, arr) {
    if (cur === this.arrive) {
      this.min = Math.min(val, Infinity);
      this.paths.push(arr);
    } else {
      if (this.flag[cur]) return;
      this.flag[cur] = true;
      for (let i = 0; i < this.list[cur].length; i++) {
        const next = this.list[cur][i];
        this.recursive(val + 1, next, [...arr, next]);
      }
      this.flag[cur] = false;
    }
  }
}

const graph = new Dfs();

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

console.log(graph.dfs("A", "E"));

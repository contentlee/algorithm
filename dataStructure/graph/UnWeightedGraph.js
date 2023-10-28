// terminology
// vertex : 정점
// edge : 간선
// directed graph vs undirected graph (instagram vs facebook)
// weighted graph vs unweighted graph (edge에 값을 부여)

// adjacency matrix
// adjacency list

class UnWeightedGraph {
  list = {};

  addVertex(key) {
    if (!this.list[key]) this.list[key] = [];
  }

  addEdge(key1, key2) {
    if (!this.list[key1] || !this.list[key2]) return;

    if (!this.list[key1].includes(key2)) this.list[key1].push(key2);
    if (!this.list[key2].includes(key1)) this.list[key2].push(key1);
  }

  removeEdge(key1, key2) {
    if (!this.list[key1] || !this.list[key2]) return;

    this.list[key1] = this.list[key1].filter((v) => v !== key2);
    this.list[key2] = this.list[key2].filter((v) => v !== key1);
  }

  removeVertex(key) {
    if (!this.list[key]) return;

    this.list[key].forEach((k) => {
      this.list[k] = this.list[k].filter((v) => v !== key);
    });

    delete this.list[key];
  }
}

// const graph = new Graph();

// graph.addVertex("Tokyo");
// console.log(graph.list);

//visiting, undating, checking
//

export default UnWeightedGraph;

class WeightedGraph {
  list = {};

  addVertex(key) {
    if (!this.list[key]) this.list[key] = [];
  }

  addEdge(vertex1, vertex2, weight) {
    if (!this.list[vertex1] || !this.list[vertex2]) return;

    if (this.checkDuplicate(vertex1, vertex2)) this.list[vertex1].push({ node: vertex2, weight });
    if (this.checkDuplicate(vertex2, vertex1)) this.list[vertex2].push({ node: vertex1, weight });
  }

  checkDuplicate(vertex1, vertex2) {
    return this.list[vertex1].findIndex((v) => v.node === vertex2) === -1 ? true : false;
  }

  removeVertex(vertex1) {
    if (!this.list[vertex1]) return;

    this.list[vertex1].forEach((vertex2) => {
      this.list[vertex2.node] = this.list[vertex2.node].filter((v) => v.node !== vertex1);
    });

    delete this.list[vertex1];
  }

  removeEdge(vertex1, vertex2) {
    if (!this.list[vertex1] || !this.list[vertex2]) return;

    this.list[vertex1] = this.list[vertex1].filter((v) => v.node !== vertex2);
    this.list[vertex2] = this.list[vertex2].filter((v) => v.node !== vertex1);
  }
}

export default WeightedGraph;

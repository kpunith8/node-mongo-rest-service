const EventEmitter = require("events");

class QueryExecutor extends EventEmitter {
  save(query) {
    // if(query.op === 'find') {
    query.then(data => {
      this.emit("dataReady", data);
    });
    // }
  }
}

module.exports = QueryExecutor;

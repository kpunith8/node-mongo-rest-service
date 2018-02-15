var mongoose = require('mongoose');

var schema = mongoose.Schema;

var bookSchema = new schema(
  {
    title: String,
    author: String,
    genre: String,
    read: {type: Boolean, default: false }
  }
);

module.exports = mongoose.model('Book', bookSchema);


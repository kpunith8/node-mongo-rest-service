var bookController = function(book) {
  var post = function(req, res) {
    var newBook = new book(req.body);
    newBook.save();

    res.status(201).send(newBook); // status created
  };

  var get = function(req, res) {
    var query = {};

    if (req.query.genre) {
      query.genre = req.query.genre;
    }

    book.find(query, function(err, books) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(books);
      }
    });
  };

  return {
    post: post,
    get: get
  };
};

module.exports = bookController;
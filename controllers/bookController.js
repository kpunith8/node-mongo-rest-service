const bookController = function (book) {
  const post = function (req, res) {
    const newBook = new book(req.body);
    newBook.save();

    res.status(201).send(newBook); // status created
  };

  const get = function (req, res) {
    const query = {};

    if (req.query.genre) {
      query.genre = req.query.genre;
    }

    book.find(query, function (err, books) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(books);
      }
    });
  };

  return {
    post,
    get,
  };
};

module.exports = bookController;

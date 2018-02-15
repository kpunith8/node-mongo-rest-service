var express = require('express');

var routes = function(book) {
  var bookRouter = express.Router();
  var bookController = require('../controllers/bookController')(book);

  bookRouter.route('/')
  .post(bookController.post)
  .get(bookController.get);

  // Middleware to handle the findById
  bookRouter.use('/:id', function(req, res, next) {
    book.findById(req.params.id, function(err, book) {
      if (err) {
        res.status(500).send(err);
      }
      else if (book) {
        req.book = book;
        next();
      }
      else {
        res.status(400).send('Book not found!');
      }
    });
  });

  bookRouter.route('/:id')
    .get(function(req, res) {
      res.json(req.book);
    })
    .put(function(req, res) { // Update the existing item
      req.book.title = req.body.title;
      req.book.author = req.body.author;
      req.book.genre = req.body.genre;
      req.book.read = req.body.read;

      req.book.save(function(err) {
        if (err) {
          res.status(500).send(err);
        }
        else {
          res.json(req.book);
        }
      });
    })
    .patch(function(req, res) { // Update a field
      if (req.body._id) {
        delete req.body._id;
      }

      for (var p in req.body) {
        req.book[p] = req.body[p];
      }

      req.book.save(function(err) {
        if (err) {
          res.status(500).send(err);
        }
        else {
          res.json(req.book);
        }
      });
    })
    .delete(function(req, res) {
      req.book.remove(function(err) {
        if (err) {
          res.status(500).send(err);
        }
        else {
          res.status(204).send('Removed!');
        }
      });
    });

  return bookRouter;
};

module.exports = routes;
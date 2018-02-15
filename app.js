var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var config = require('./config');
var cors = require('cors');
var book = require('./models/bookModel');

var app = express();
app.use(cors()); // Used to allow Cross origin resource sharing.

var port = process.env.PORT || 3000;
var db = mongoose.connect('mongodb://localhost/bookAPI');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var bookRouter = require('./routes/bookRoutes')(book);

app.use('/api/books', bookRouter); // access using, localhost:3000/api/books?gerne=Science

app.get('/', function(req, res) {
  res.send('Welcome to web services, Hi...!');
});

app.listen(port, function(){
  console.log('Running on PORT: ' + port);
});
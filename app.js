const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const book = require("./models/bookModel");
const dotenv = require("dotenv");
const connectToDatabase = require("./utils/dbConnection");
const { populateWithBasicRef } = require("./utils/test-scenarios");

// local uri
// mongodb://localhost:27017 -> Connected to docker mongo instance
dotenv.config();
const PORT = process.env.PORT || 3000;

connectToDatabase(process.env.MONGO_LOCAL_URI);

const app = express();
app.use(cors()); // Used to allow Cross origin resource sharing.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const bookRouter = require("./routes/bookRoutes")(book);

app.use("/api/books", bookRouter); // access using, localhost:3000/api/books?gerne=Science

app.get("/", function (req, res) {
  res.send("Welcome...");
});

populateWithBasicRef();

app.listen(PORT, () => {
  console.log("Server up and running on:" + PORT);
});

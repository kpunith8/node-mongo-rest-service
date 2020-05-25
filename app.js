const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const book = require("./models/bookModel");
const Person = require("./models/person");
const Story = require("./models/story");
const dotenv = require("dotenv");
const QueryExecutor = require("./utils/QueryExecutor.js");
const connectToDatabase = require("./utils/dbConnection");

dotenv.config();
const PORT = process.env.PORT || 3000;

connectToDatabase();

const app = express();
app.use(cors()); // Used to allow Cross origin resource sharing.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const bookRouter = require("./routes/bookRoutes")(book);

app.use("/api/books", bookRouter); // access using, localhost:3000/api/books?gerne=Science

app.get("/", function (req, res) {
  res.send("Welcome...");
});

const queryExecutor = new QueryExecutor();

// https://alexanderzeitler.com/articles/mongoose-referencing-schema-in-properties-and-arrays/
// Mongoose populate() to join multiple documents
// Remove all the records before inserting new ones, otherwise it inserts them all the time you run this
Person.deleteMany({}).exec();
Story.deleteMany({}).exec();

const author = new Person({
  _id: new mongoose.Types.ObjectId(),
  name: "Ian Fleming",
  age: 50,
});

const fan1 = new Person({
  _id: new mongoose.Types.ObjectId(),
  name: "Punith",
  age: 30,
});

const fan2 = new Person({
  _id: new mongoose.Types.ObjectId(),
  name: "Ryan",
  age: 35,
});

fan1.save();
fan2.save();

author.save((err) => {
  if (err) console.error(err);

  const story1 = new Story({
    title: "Casino Royale1",
    author: author._id, // assign the _id from the author
    fans: [
      { fanId: fan2._id, likes: 100 },
      { fanId: fan1._id, likes: 80 },
    ],
  });

  story1.save((err) => {
    if (err) console.error(err);

    // Pushing child refs to stories array before querying the stories
    // This can be avoided to have the stories pushed to person, since stories have a person id as reference
    author.stories.push(story1);
    author.save((err) => {
      if (err) console.error(err);

      // Person.findOne({ name: "Ian Fleming" })
      //   .populate("stories") // only works if we pushed refs to children
      //   .exec(function(err, person) {
      //     if (err) console.error(err);
      //     console.log("Person Stories", person);
      //   });

      let event2 = Person.findOne({ name: "Ian Fleming" }).populate("stories");
      event2.then((data) => {
        console.log("Stories:", data);
      });

      // Using Event emiiters
      // queryExecutor.save(event2);
    });

    // Story.find({ title: "Casino Royale1" })
    //   .populate("auhtor")
    //   .populate("fans._") // access nested data using populate
    //   .then(data => console.log("Data After saving story:", data[0].fans));

    // Execute with event emitters
    let event1 = Story.find({ title: "Casino Royale1" })
      .populate("auhtor")
      .populate("fans._");

    queryExecutor.save(event1);
  });
});

queryExecutor.on("dataReady", (data) => {
  console.log("Data in event emitter:", data);
});

app.listen(PORT, () => {
  console.log("Server up and running on:" + PORT);
});

const mongoose = require("mongoose");
const Person = require("../models/person");
const Story = require("../models/story");

// https://alexanderzeitler.com/articles/mongoose-referencing-schema-in-properties-and-arrays/
// Mongoose populate() to join multiple documents
const populateWithBasicRef = () => {
  // populate multiple paths, resolves both author and fansS
  Story.find({ title: "Casino Royale1" })
    .populate("fans") // access nested data using populate, id was created differently with, new mongoose.Types.ObjectId(), just use _
    .populate("author")
    .then((data) => {
      console.log("Populated fans for the given story", data);
    });

  /* Using exec with callbacks */
  Person.findOne({ name: "Ian Fleming" })
    .populate("stories") // only works if we pushed refs to children
    .exec(function (err, person) {
      if (err) console.error(err);
      // console.log("Person Stories", person);
    });

  /* Using Promise based API */
  // let event2 = Person.findOne({ name: "Ian Fleming" }).populate("stories");
  // event2.then((data) => {
  //   console.log("Stories:", data);
  // });
};

// Call this in app.js before calling, populateWithBasicRef()
const insertForBasicRef = async () => {
  // Delete all the entries from the collection
  await Person.deleteMany({});
  await Story.deleteMany({});

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

  try {
    await fan1.save();
    await fan2.save();
  } catch (err) {
    console.log("Error saving fans:", err.message);
  }

  author.save((err) => {
    if (err) console.error(err.message);

    const story = new Story({
      title: "Casino Royale1",
      author: author._id, // assign the _id from the author
      fans: [
        { fanId: fan2._id, likes: 100 },
        { fanId: fan1._id, likes: 80 },
      ],
    });

    story.save((err) => {
      if (err) console.error(err.message);

      // Pushing child refs to stories array before querying the stories
      // This can be avoided to have the stories pushed to person, since stories have a person id as reference
      author.stories.push(story);

      // Save the author once stories have been pushed to stories array.
      author.save((err) => {
        if (err) console.error(err.message);
      });
    });
  });
};

module.exports = { populateWithBasicRef, insertForBasicRef };

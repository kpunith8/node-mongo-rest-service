const mongoose = require("mongoose");

const connectToDatabase = (url) => {
  const mongooseOptions = { useNewUrlParser: true, useUnifiedTopology: true };
  mongoose.connect(url, mongooseOptions);

  const db = mongoose.connection;

  db.on("error", console.error.bind(console, "connection error"));
  db.once("open", () => {
    console.log(`Database connected!! Happy Querying!!`);
  });
};

module.exports = connectToDatabase;

const mongoose = require("mongoose");

const connectToDatabase = () => {
  const mongooseOptions = { useNewUrlParser: true, useUnifiedTopology: true };
  mongoose.connect(process.env.MONGO_URI, mongooseOptions);

  const db = mongoose.connection;

  db.on("error", console.error.bind(console, "connection error"));
  db.once("open", () => {
    console.log(`Database connected!! Happy Querying!!`);
  });
};

module.exports = connectToDatabase;

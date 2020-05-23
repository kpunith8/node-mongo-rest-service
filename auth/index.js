const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("../routes/authRoutes");
const postRoutes = require("../routes/postRoutes");

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors()); // Used to allow Cross origin resource sharing.

const mongooseOptions = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.connect(process.env.MONGO_URI, mongooseOptions, () =>
  console.log(`Database connected!! Yay :)`)
);

app.use(express.json());
app.set("view engine", "ejs");

//Serves static html files using ejs
app.use("/", (req, res) => {
  res.render("index.ejs");
});

app.use("/api/user", authRoutes);
// Now the `posts` end point is protected, if no auth token, 401 sent
// and not allowed to access
app.use("/api/posts", postRoutes);

app.listen(PORT, () => {
  console.log(`Server up and running on ${PORT}`);
});

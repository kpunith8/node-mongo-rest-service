const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("../routes/authRoutes");
const postRoutes = require("../routes/postRoutes");
const connectToDatabase = require("../utils/dbConnection");

dotenv.config();
const PORT = process.env.PORT || 3000;

connectToDatabase(process.env.MONGO_URI);

const app = express();
app.use(cors()); // Used to allow Cross origin resource sharing.
app.use(express.json());
//Serves static html files using ejs view engine
app.set("view engine", "ejs");

app.use("/api/user", authRoutes);
// Now the `posts` end point is protected, if no auth token, 401 sent
// and not allowed to access
app.use("/api/posts", postRoutes);

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.listen(PORT, () => {
  console.log(`Server up and running on: ${PORT}`);
});

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("../routes/authRoutes");

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors()); // Used to allow Cross origin resource sharing.
const mongooseOptions = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.connect(process.env.MONGO_URI, mongooseOptions, () =>
  console.log(`Database connected!! Yay :)`)
);
app.use(express.json())
app.use("/api/user", authRoutes);

app.listen(PORT, () => {
  console.log(`Server up and running on ${PORT}`);
});

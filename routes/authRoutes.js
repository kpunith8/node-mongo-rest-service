const authRouter = require("express").Router();
const User = require("../models/user");

authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const user = new User({ name, password, email });

  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = authRouter;

const authRouter = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { userValidation, loginValidation } = require("../utils/validation");
const User = require("../models/user");
const cookie = require('cookie')

authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const { error } = userValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check whether user exists in the DB already, so that we don't add
  // multiple entries for the same user
  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).send(`Email already exists!!`);

  // Hash/encrypt the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = new User({ name, password: hashedPassword, email });

  try {
    await user.save();
    res.status(201).send({ user: user._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check whether user exists in the DB.
  const user = await User.findOne({ email });
  if (!user) return res.status(400).send(`Email or password is incorrect`);

  // Decrypt and verify that the password is correct
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) return res.status(401).send(`Password is incorrect`);

  // Create and assign a JWT token
  // Auth tokens can have an expiry time so that user needs
  // login each time to access after an expiry ends
  const JWTToken = jwt.sign({ _id: user._id }, process.env.JWT_ACCESS_TOKEN, {
    expiresIn: "60m",
  });
  // res.header("auth-token", JWTToken); // send it or set the header
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("auth-token", JWTToken, {
      // httpOnly: true,
      maxAge: 60 * 30, // 30 mins
    })
  );
  res.status(200).send(JWTToken);
});

module.exports = authRouter;

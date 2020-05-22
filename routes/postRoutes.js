const postRouter = require("express").Router();
const verifyAuth = require("../utils/verifyAuth");

const posts = [
  {
    title: "First Post",
    description: "Lets do it",
  },
];

postRouter.get("/", verifyAuth, (req, res) => {
  // after the verify `res` object has verified token with `_id`,
  // we passed to create the JWT token, now we can pass the `_id` across the
  // routes
  console.log("user_id from result:", res.user._id);
  // use the _id to query the `User` schema to get additional values if needed.
  // User.findByOne({_.id: res.user._id})

  res.json({
    posts,
  });
});

module.exports = postRouter;

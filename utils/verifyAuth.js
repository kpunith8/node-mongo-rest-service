const jwt = require("jsonwebtoken");

const verifyAuth = (req, res, next) => {
  const authToken = req.header("auth-token");
  if (!authToken) return res.status(401).send(`Access Denied`);

  try {
    const verified = jwt.verify(authToken, process.env.JWT_SECRET);
    res.user = verified;
    next();
  } catch (err) {
    console.log("Error verifying the auth token");
  }
};

module.exports = verifyAuth;

const jwt = require("jsonwebtoken");

const verifyAuth = (req, res, next) => {
  // auth token can be set to authorization header and it has
  // a format `Bearer <token>`
  // Read from authorization header, if it is set,
  /*
  const authHeader = req.headers['authorization']
  const authToken = authHeader && authHeader.split(' ')[1]
  */
  const authToken = req.header("auth-token");
  if (!authToken) return res.status(401).send(`Access Denied`);

  try {
    const verified = jwt.verify(authToken, process.env.JWT_ACCESS_TOKEN, {expiresIn: '60m'});
    res.user = verified;
    next();
  } catch (err) {
    console.log("Error verifying the auth token");
  }
};

module.exports = verifyAuth;

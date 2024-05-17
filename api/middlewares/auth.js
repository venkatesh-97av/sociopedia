const jwt = require("jsonwebtoken");
const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization"); //front end will set this token and we can grab this back in the server for authorosation purposes
    if (!token) {
      return res.status(403).send("Access Denied");
    }
    if (token.startswith("Bearer")) {
      token = token.slice(7, token.length).trimLeft();
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = verifyToken;

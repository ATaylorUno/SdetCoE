const jwt = require("jsonwebtoken");
const handleTest = (res, next) => {
  res.locals.user = 1;
  return next();
};

const verifyToken = async (req, res, next) => {
  if (process.env.NODE_ENV === "test") return handleTest(res, next);
  if (req.path === "/users" && req.method == "POST") return next();

  const splitAuth = req.headers.authorization?.split(" ");
  const token = splitAuth && splitAuth.length >= 2 && splitAuth[1];

  if (token) {
    try {
      const tokenVerified = checkTokenValidity(token, "MySecretValue");
      if (tokenVerified) {
        res.locals.user = tokenVerified.sub;
        return next();
      }
    } catch {
      return res.sendStatus(401);
    }
  }
  return res.sendStatus(401);
};

const checkTokenValidity = (token, secret) => {
  return jwt.verify(token, secret);
};

module.exports = {
  verifyToken
};

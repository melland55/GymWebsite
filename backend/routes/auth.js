const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == 'null' || token == null || token == 'undefined') {
    return res.status(401).json({ isAuthenticated: false, message: 'Unauthorized' });
  }
  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ isAuthenticated: false, message: 'Forbidden' });
    }
    req.user = user;
    next();
  });
};

const authenticateUser = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    console.log("aaa-"+token);
    console.log(req.params.username);
    if (token == 'null' || token == null) {
      return res.status(401).json({ isAuthenticated: false, message: 'Unauthorized' });
    }
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.status(403).json({ isAuthenticated: false, message: 'Forbidden' });
      }
      if (user.username !== req.params.username) {
        return res.status(403).json({ isAuthenticated: false, message: 'Forbidden' });
      }
      req.user = user;
      next();
    });
  };

module.exports = { authenticateToken, authenticateUser };
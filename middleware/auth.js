const jwt = require('jsonwebtoken');
const dotenv = require("dotenv").config({ encoding: "latin1" });


module.exports = (req, res, next) => {
    const token = req.headers.authorization;
    console.log(token)
    if (!token) {
      return res.status(403).send({
        message: "You must be logged in",
      });
    }
    jwt.verify(token, process.env.TOKEN_KEY, (err) => {
      if (err) {
        return res.status(401).json({ message: "Bad token" });
      }
      // Stockage userId - role pour authentification route
      req.userId = jwt.verify(token, process.env.TOKEN_KEY).userId;
      req.role = jwt.verify(token, process.env.TOKEN_KEY).role;
      next();
    });
};


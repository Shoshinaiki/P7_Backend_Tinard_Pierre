// Vérification du role admin
module.exports = (req, res, next) => {
    if (req.role === 0) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    next();
  };
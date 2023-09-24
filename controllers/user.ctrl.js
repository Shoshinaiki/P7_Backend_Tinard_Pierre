const db = require("../models"); // // les modèles sequelize

const User = db.user;

// READ

exports.findOneUser = (req, res, next) => {
  User.findByPk(req.params.id) 
    .then((user) => {
      if(req.userId === user.id) {
        res.status(200).json(user);
      }
      else {
        res.status(401).json({ message: "Unauthorized" });
      }
    })
    .catch((error) => res.status(404).json({ error }));
};

exports.findAllUsers = (req, res, next) => {
  User.findAll()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.deleteMyAccount = (req, res, next) => {
  User.destroy({ where: { id: req.params.id } })
    .then(() => res.status(200).json({ message: "Compte supprimé" }))
    .catch((error) => console.log(error));
};

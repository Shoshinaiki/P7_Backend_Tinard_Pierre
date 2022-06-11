const groupomania_internal_network = require("../models"); // // les modèles sequelize
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const Message = groupomania_internal_network.messages;
const Comment = groupomania_internal_network.comments;
const dotenv = require("dotenv").config({ encoding: "latin1" });
const Op = groupomania_internal_network.Sequelize.Op;

exports.signup = (req, res, next) => {
  bcrypt.hash(re.body.password, 10).then((hash) => {
    const user = new User({
      email: req.body.email,
      password: hash,
    });
    user
      .save(new User())
      .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
      .catch(() =>
        res.status(400).json({
          message: "Un utilisateur existe déjà avec cette adresse e-mail",
        })
      );
  });
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, process.env.TOKEN_KEY, {
              exprireIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ errror }));
    })
    .catch((error) => res.status(500).json({ error }));
};

// Routes CRUD : Create, Read, Update, Delete.

// CREATE

exports.createUser = (req, res, next) => {
  // const user = new User (
  //  {
  //   firstName: req.body.firstName,
  //   lastName: req.body.lastName,
  //   email: req.body.email,
  //   password: req.body.password
  //  }
  // )
  console.log("je suis ici ou pas");
  User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  })
    .then(() => res.status(201).json({ message: "Utilisateur ajouté !" }))
    .catch((error) => res.status(400).json({ error }));
};

// READ

exports.findOneUser = (req, res, next) => {
  const userData = {};
  User.findOne({ where: { id: req.params.id } })
    .then((user) => {
      userData.firstname = user.firstName;
      userData.lastName = user.lastName;
      userData.email = user.email;
      userData.createdAt = user.createdAt;
      userData.isAdmin = user.isAdmin;
    })
    .then(() => {
      Message.count({ where: { userId: req.params.id } }).then((total) => {
        userData.totalMessages = total;
      });
    })
    .then(() => {
      Comment.count({ where: { userId: req.params.id } }).then((total) => {
        userData.totalComments = total;
        res.status(200).json(userData);
      });
    })
    .catch((error) => res.status(404).json({ error }));
};

exports.findAllUsers = (req, res, next) => {
  User.findAll({
    where: { id: { [Op.gt]: 0 } },
  })
    .then((found) => {
      res.status(200).json({ found });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

// UPDATE

/* exports.updateUsers = (req, res, next) => {
    Users.updatedone()
    User.findOne({ where: { email: req.params.email }})
    .then(user => {
      email: req.body.email,
      password: req.body.password
    })
    .then(() => {
        user.count({ where: { password: req.params.password }})
        .then(total => { 
            userData.totalMessages = total
        })
    .then(comments => { res.status(200).json(comments )})
    .catch(error => res.status(400).json({ error }))
}; */

// params uid & isAdmin

// DELETE

exports.deleteMyAccount = (req, res, next) => {
  Comment.destroy({ where: { UserId: req.params.id } });
  Message.destroy({ where: { UserId: req.params.id } });
  User.destroy({ where: { id: req.params.id } })
    .then(() => res.status(200).json({ message: "Compte supprimé" }))
    .catch((error) => console.log(error));
};

const db = require("../models"); // les modèles sequelize
const User = db.user;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordValidator = require("password-validator");
const dotenv = require("dotenv").config({ encoding: "latin1" });

const passw = new passwordValidator();
passw
    .is().min(8)                                                     // Minimum length 8
    .is().max(100)                                                   // Maximum length 100
    .has().uppercase()                                               // Must have uppercase letters
    .has().lowercase()                                               // Must have lowercase letters
    .has().digits()                                                  // Must have digits
    .has().not().spaces()                                            // Should not have spaces
    .is().not().oneOf(['guest', '159357', 'azerty']); // Blacklist these values

// SIGNUP / Inscription

exports.signup = (req, res, next) => {
  const schema = Joi.object().keys({
    lastName: Joi.string().min(4).required(),
    firstName: Joi.string().min(4).required(),
    email: Joi.string()
      .regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/)
      .required(),
    password: Joi.string().min(4).required(),
  });

  if (schema.validate(req.body).error) {
    res.send(schema.validate(req.body).error.details);
  } else if ( !passw.validate(req.body.password)) { // Si password validator = validation false donc:
    res.status(422).json({ message: "Password too weak."}); // mot de passe trop faible
  } else {
    bcrypt
      .hash(req.body.password, parseInt(8))
      .then((hash) => {
        User.create({
          email: req.body.email,
          password: hash,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
        })
        .then((user) => {
          res.send({ message: "User was registered successfully!" });
        })
      })
      .catch((error) => res.status(500).json({ error }));
  }
};

// LOGIN / Connexion de l'utilisateur

exports.login = (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: "one or more parameters empty" });
  }
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "email not found !" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          console.log("test");
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe non valide !" });
          }
          res.status(200).json({
            userId: user.id,
            role: user.superUser,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            token: jwt.sign({ userId: user.id, role: user.superUser, }, process.env.TOKEN_KEY, {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};


exports.findOneUser = (req, res, next) => {
  role === admin || User == User(id) 
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

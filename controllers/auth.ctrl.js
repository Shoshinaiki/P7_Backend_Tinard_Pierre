const groupomania_internal_network = require("../models"); // les modèles sequelize 
const User = groupomania_internal_network.users;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// SIGNUP / Inscription

exports.signup = (req, res, next) => {
    if ( !req.body.userName || !req.body.email || !req.body.password ) {
      return res.status(400).json({message: "one or more paramaters empty"})
    }
      const nameRegex = /(.*[a-z]){3,30}/;
      const mailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
      const pwdRegex  = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/ 

    if (nameRegex.test(req.body.userName) && mailRegex.test(req.body.email) && pwdRegex.test(req.body.password)) {
      bcrypt.hash(req.body.password, 10) // le mot de passe est hashé avec un salt de 10
        .then(hash => {
          const user = new User({
            userName:   req.body.userName,    
            email:      req.body.email,       // le mail encodé est sauvegardé
            password:   hash                  // le hash est assigné comme valeur de la propriété password de l'objet user
          });
          user.save()                         // On sauvegarde tout dans la base de données
        .then((user) => {
          if (user) {
            return res.status(201).json({ message: 'new user created' })
          }
        })
        .catch((error) => {res.status(401).json({ error })});
        })
      .catch((error) => { res.status(500).json({message: "erreur serveur" + error})})
      } else {
        res.status(400).json({message: "incorrect paramaters"})
      }
  };
  
// LOGIN / Connexion de l'utilisateur


exports.login = (req, res, next) => {
  if ( !req.body.email || !req.body.password ) {
    return res.status(400).json({message: "one or more parameters empty"});
}
    User.findOne({
      where: {
        email: req.body.mail
      }
      })
    .then((user) => { 
        if (!user) {
          return res.status(404).json({ error: "email not found !" });
        }
        bcrypt.compare(req.body.password, user.password)
          .then((valid) => {
            if (!valid) {
              return res.status(401).json({ error: "Mot de passe non valide !" });
            }
            res.status(200).json({
              message: "Connexion réussie",
              userId:   user.id,
              role:     user.isadmin,
              userName: user.userName,
              token: jwt.sign( { userId: user.id }, process.env.TOKEN_KEY, {expiresIn: '24h' })
            })
          })
          .catch((error) => res.status(500).json({ error }));
        })
      .catch((error) => res.status(500).json({ error }));
  };
  
  
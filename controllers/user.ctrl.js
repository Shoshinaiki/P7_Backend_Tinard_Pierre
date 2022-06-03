const  groupomania_internal_network = require("../models"); // // les modèles sequelize
const User = groupomania_internal_network.User;
const Message = groupomania_internal_network.messages;
const Comment = groupomania_internal_network.comments;
const Op = groupomania_internal_network.Sequelize.Op;

// Routes CRUD : Create, Read, Update, Delete.

// CREATE

exports.createUser = (req, res, next) => {
    const user = new User (
     {
      firstName: req.body.firstName,
      lastName: req.body.lastname,
      email: req.body.email,
      emailUnique: true, // email doit être unique
      password: req.body.password
     }
    )
   user.save()
   .then(() => res.status(201).json({message: "Utilisateur ajouté !"}))
   .catch(error => res.status(400).json({ error }))
   };

// READ

exports.findOneUser = (req, res, next) => {
    const userData = {}
    User.findOne({ where: { id: req.params.id }})
    .then(user => {
        userData.firstname      = user.firstName
        userData.lastName       = user.lastName
        userData.email          = user.email
        userData.createdAt      = user.createdAt
        userData.isAdmin        = user.isAdmin
    })
    .then(() => {
        Message.count({ where: { userId: req.params.id }})
        .then(total => { 
            userData.totalMessages = total
        })
    })  
    .then(() => {
        Comment.count({ where: { userId: req.params.id }})
        .then( total => { 
            userData.totalComments = total
            res.status(200).json(userData)
        })
    })
    .catch(error => res.status(404).json({ error }))
}
      
exports.findAllUsers = (req, res, next) => {
    User.findAll({
        where: {id: { [Op.gt]: 0 }} 
    })    
    .then( (found) => {
        res.status(200).json({ found }) 
    })
    .catch((error) => { 
        res.status(400).json({ error }) 
    })
}

  // UPDATE 

  /* exports.updateUsers = (req, res, next) => {
    Users.updatedone()
    User.findOne({ where: { email: req.params.email }})
    .then(user => {
      email: req.body.email,
      emailUnique: true, // email doit être unique
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

  exports.deleteOneUser = (req, res, next) => {
      console.log(" USER DELETION PROCESS ")
      console.log(" user Id is: " + req.query.uid)
      console.log(" User Id who ask the deletion is sAdmin : " + req.query.isAdmin)
  
      console.log(" if isAdmin True => delete the user ")
      console.log(" if False => unauthorized ")
      
      console.log(req.query.isAdmin)
      if(req.query.isAdmin) {
          User.destroy({ where: { id: req.query.uid}})
          Message.destroy({ where: { UserId: req.query.uid }})
          Comment.destroy({ where: { UserId: req.query.uid }})
          .then((res) => {
              res.status(200).json({ message: "User, its Messages and its comments have been destroyed" })
          })
          .catch(error => res.status(400).json({ error }))
      } else {
          res.status(401).json({message : " unauthorized "})
      }
  }
  
  exports.deleteMyAccount = (req, res, next) => {
      console.log(" USER ACCOUNT DELETION PROCESS ")
      console.log(" user Id is: " + req.params.id)
  
      Comment.destroy({ where: { UserId: req.params.id }})
      Message.destroy({ where: { UserId: req.params.id }})
      User.destroy({ where: { id: req.params.id }}) 
      .then( () => res.status(200).json({message: "ok"}))
      .catch(error => console.log(error))
};


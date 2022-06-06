const groupomania_internal_network = require("../models");  // les modèles sequelize
const Comment = groupomania_internal_network.comments;
const User = groupomania_internal_network.users;

// Routes CRUD: Create, Read, Update, Delete.

// CREATE

exports.createComment = (req, res, next) => {
    const comment = new Comment(
     {
      userId:    req.body.UserId,
      MessageId: req.body.MessageId,
      comment:   req.body.comment
     }
    )
   comment.save()
   .then(() => res.status(201).json({message: "Commentaire ajouté !"}))
   .catch(error => res.status(400).json({ error }))
};

// READ

exports.findOneComment = (req, res, next) => {
    Comment.findAll({ 
        where: {
            MessageId:  req.params.MessageId
        },
        include: {
          model: User,
          required: true,
          attributes: ["username"]
        }
    })
    .then(comment => { res.status(200).json(comment) })
    .catch(error => res.status(404).json({ error }))
};  

exports.findAllComments = (req, res, next) => {
   Comment.findAl()
   .then(comments => { res.status(200).json(comments )})
   .catch(error => res.status(400).json({ error }))
}; 

// UPDATE 

exports.modifyComments = (req, res, next) => {
    Comment.updatedAl()
    .then(comments => { res.status(200).json(comments )})
    .catch(error => res.status(400).json({ error }))
}; 
 
// DELETE

exports.deleteComments = (req, res, next) => {
  console.log("COMMENT DELETION PROCESS")
  console.log(" comment id is: " + req.query.commentId)
  console.log(" comment Uid is : " + req.query.commentUid)
  console.log(" currentUid who ask the deletion is : " + req.query.currentUid)

  console.log(" is it the author of the comment who ask the deletion or is he Admin (admin is uid=1 so should be currentUid = 1) ? ") + 
  console.log(" if True => delete the comment ")
  console.log(" if False => unauthorized ")

  Comment.destroy({ where: {id: req.query.commentId }})
      .then(() => res.status(200).json({ message: "Commentaire supprimé !"}))
      .catch(error => res.status(400).json({ error }))
};
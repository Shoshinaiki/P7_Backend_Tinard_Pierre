const db = require("../models"); // les modèles sequelize
const Comment = db.comment;
const User = db.user;

// Routes CRUD: Create, Read, Update, Delete.

// CREATE

exports.createComment = (req, res, next) => {
  const comment = new Comment({
    author: req.body.author,
    PostId: req.body.postId,
    text: req.body.text,
  });
  comment
    .save()
    .then(() => res.status(201).json({ message: "Commentaire ajouté !" }))
    .catch((error) => res.status(400).json({ error }));
};

// DELETE

exports.deleteComments = (req, res, next) => {
  Comment.destroy({ where: { id: req.params.id } })
    .then(() => res.status(200).json({ message: "Commentaire supprimé !" }))
    .catch((error) => res.status(400).json({ error }));
};

const db = require("../models"); // les modèles sequelize
const Post = db.post;
const Comment = db.comment;

// Routes CRUD : Create, Read, Update, Delete

// CREATE

exports.createMessage = (req, res, next) => {
  const post = new Post({
    author: req.body.author,
    text: req.body.text,
    // imageUrl: `${req.protocol}://${req.get("host")}/images/${
    //   req.file.filename
    // }`,
  });
  post
    .save()
    .then(() => res.status(201).json({ message: "Publication réussie" }))
    .catch((error) => res.status(400).json({ error }));
};

// READ

exports.findAllMessages = (req, res, next) => {
  Post.findAll({
    include: { model: Comment },

    order: [["id", "DESC"]],
  })
    .then((messages) => {
      res.status(200).json(messages);
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.findOneMessage = (req, res, next) => {
  Post.findByPk(req.params.id)
    .then((message) => {
      res.status(200).json(message);
    })
    .catch((error) => res.status(400).json({ error }));
};

// DELETE

exports.deleteMessage = (req, res, next) => {
  Post.destroy(req.body, {
    id: req.params.id,
    text: req.params.text,
    imageUrl: req.params.imageUrl,
    author: req.params.author
  }
  .then(() => res.status(200).json({message: "message supprimé !"}))
  .catch((error) => res.status(400).json({ error })) 
  );
};

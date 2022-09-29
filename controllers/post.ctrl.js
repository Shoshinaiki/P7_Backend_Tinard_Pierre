const db = require("../models"); // les modèles sequelize
const Post = db.post;

// Routes CRUD : Create, Read, Delete, Modify and LIKE

// CREATE

exports.createMessage = (req, res, next) => {
  const post = new Post({
    author: req.body.author,
    text: req.body.text,
    titre: req.body.titre,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
  });
  post
    .save()
    .then(() => res.status(201).json({ message: "Publication réussie" }))
    .catch((error) => res.status(400).json({ error }));
};

// READ

exports.findAllMessages = (req, res, next) => {
  Post.findAll()
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
  Post.destroy({ where: { id: req.params.id } })
  .then(() => res.status(200).json({message: "message supprimé !"}))
  .catch((error) => res.status(400).json({ error })) 
};

// MODIFY 

exports.modifyMessage = (req, res) => {
  const id = req.params.id;
  const newImg = req.file ?
    {
      ...req.body,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  Post.update(newImg, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Article was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Article with id=${id}. Maybe Article was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Article with id=" + id,
      });
    });
};

// LIKE 

exports.like = (req, res, next) => {
  const like = parseInt(req.body.like);
  if (like === 1) {
    Post.findOne({ id: req.params.id })
      .then((post) => {
        post.likes++;
        post.usersLiked.push(req.params.userId);
        Post.updateOne(
          { id: req.params.id },
          { likes: post.likes, usersLiked: post.usersLiked, id: req.params.id }
        )
          .then(() => res.status(200).json({ message: "Vous avez like ce produit !" }))
          .catch((error) => res.status(400).json({ error }));
      })
    }
    else if (like === 0) {
      Post.findOne({ id: req.params.id })
        .then((post) => {
          post.likes--;
          let index = post.usersLiked.findindex( elem => elem == req.params.userId )
          post.usersLiked.splice(index, 1);
          Post.updateOne(
            { id: req.params.id },
            { likes: post.likes, usersLiked: post.usersLiked, id: req.params.id }
          )
            .then(() => res.status(200).json({ message: "Vous avez like ce produit !" }))
            .catch((error) => res.status(400).json({ error }));
        })
      }
  }
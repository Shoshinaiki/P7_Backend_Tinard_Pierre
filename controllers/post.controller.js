const { postHasLike } = require("../models");
const db = require("../models"); // les modèles sequelize
const Post = db.post;
const PostHasLike = db.postHasLike;
const User = db.user;

// Routes CRUD : Create, Read, Delete, Modify and LIKE

// CREATE 

exports.createMessage = (req, res, next) => {
  const post = new Post({
    text: req.body.text,
    titre: req.body.titre,
    UserId: req.body.userId,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
  });
  post
    .save()
    .then((post) => {
      body = {
        PostId: post.id,
      }
      postHasLike.create(body)
      .then(() => res.status(201).json({ message: "Publication réussie" })) 
      .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(400).json({ error }));
};

// READ

exports.findAllMessages = (req, res, next) => {
  Post.findAll({include: [PostHasLike, User]})
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
  Post.findByPk(req.params.id )
    .then((post) => {
      PostHasLike.findOne({where: {PostId: post.id}})
      .then((postHasLike) => {
        let string = postHasLike.userLiked
        let array = string.split(",")
        let index = array.findIndex( elem => elem == req.params.userId )
        if(index == -1) {
          postHasLike.like++;
          array.push(req.params.userId);
          postHasLike.userLiked = array.toString()
          PostHasLike.update(
            { like: postHasLike.like, userLiked: postHasLike.userLiked },
            {where: {PostId: post.id}} 
          )
            .then(() => res.status(200).json({ message: "Vous avez like ce produit !" }))
            .catch((error) => res.status(400).json({ error }));
        } else {
          postHasLike.like--;
          array.splice(index, 1);
          postHasLike.userLiked = array.toString()
          PostHasLike.update(
            { like: postHasLike.like, userLiked: postHasLike.userLiked },
            {where: {PostId: post.id}} 
          )
            .then(() => res.status(200).json({ message: "Vous avez like ce produit !" }))
            .catch((error) => res.status(400).json({ error }));
        }})
      })
      .catch((error) => res.status(400).json({ error }));
}
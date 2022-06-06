const groupomania_internal_network = require("../models");  // les modèles sequelize
const Message = groupomania_internal_network.messages;
const User = groupomania_internal_network.users;
const Comment = groupomania_internal_network.comments; 

// Routes CRUD : Create, Read, Update, Delete

// CREATE

exports.createMessage = (req, res, next) => {
    console.log(req.body.message + req.body.messageUrl);
    let imagePost = "";
    if (req.file) { 
        imagePost = `${req.protocol}://${req.get("host")}/images/${req.file.filename}` 
    }
    const message = new Message (
        {
            UserId:     req.body.UserId,
            message:    req.body.message,
            messageUrl: imagePost
        }
    )
    console.log(message)
    message.save()
        .then(() => res.status(201).json({ message: "Publication réussie" }))
        .catch(error => res.status(400).json({ error }))
};

// READ

exports.findAllMessages = (req, res, next) => {
  Message.findAll({
    include: { model: User, required: true, attributes: ["userName"]}, 
    
    order: [["id", "DESC"]],
})    
.then(messages => {
    const list = messages.map(message => {
        return Object.assign({},
            {
                id:         message.id,
                createdAt:  message.createdAt,
                message:    message.message,
                messageUrl: message.messageUrl,
                UserId:     message.UserId,
                userName:   message.User.userName,
                isActive:   message.User.isActive
            }
        )
    })
    res.status(200).json({ list })
})
.catch(error => res.status(400).json({ error }))
},

exports.findOneMessage = (req, res, next) => {
  const oneMessage = {}
  Message.findOne({ 
      where: { id: req.params.id },
      include: {
          model: User,
          required: true,
          attributes: ["userName"] 
      },
      order: [["id", "DESC"]]

})
.then(message => {
  oneMessage.id           = message.id
  oneMessage.userId       = message.UserId
  oneMessage.userName     = message.User.userName
  oneMessage.createdAt    = message.createdAt
  oneMessage.message      = message.message
  oneMessage.messageUrl   = message.messageUrl
  res.status(200).json(oneMessage)
})
.catch(error => res.status(404).json({ error }))
};
// UPDATE 

exports.modifyMessage = (req, res, next) => {
    console.log(req.body.message + req.body.messageUrl);
    let imagePost = "";
    if (req.file) { 
        imagePost = `${req.protocol}://${req.get("host")}/images/${req.file.filename}` 
    }
    const modify = modifyMessage (
        {
            UserId:     req.body.UserId,
            message:    req.body.message,
            messageUrl: imagePost
        }
    )
    console.log(message)
    modifyMessage.update()
        .then(() => res.status(201).json({ message: "message modifié !" }))
        .catch(error => res.status(400).json({ error }))
};

// DELETE 

exports.deleteMessage = (req, res, next) => {
  console.log(" MESSAGE DELETION PROCESS ")
  console.log(" message Id is: " + req.query.messageId)
  console.log(" message User Id is : " + req.query.messageUid)
  console.log(" User Id who ask the deletion is : " + req.query.uid)

  console.log(" is it the author of the message who ask the deletion or is he Admin (admin is uid=1) ? ") + 
  console.log(" if True => delete the message ")
  console.log(" if False => unauthorized ")
  
  console.log(req.query.messageUid == req.query.uid || req.query.uid == 1)
  if(req.query.messageUid == req.query.uid || req.query.uid == 1) {
      Comment.destroy({ where: { MessageId: req.query.messageId }})
      Message.destroy({ where: { id: req.query.messageId }})
      .then((res) => {
              res.status(200).json({ message: "Message and its comments have been destroyed" })
      })
      .catch(error => res.status(400).json({ error }))
  } else {
      res.status(401).json({message : " unauthorized "})
  }

}
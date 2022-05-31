const post = require('post');

// Create a new post
exports.create = (req, res) => {
   
} 

// modify a post
exports.modify = (req, res) => {
    if (req.body.post) {
        modifyPost;
        res.status(200).send({
       message: "post modified !"
     });
     return;
   }
}

// remove a post
exports.remove = (req, res) => {
    if (req.body.post) {
        removePost;
        res.status(200).send({
       message: "post removed !"
     });
     return;
   }
}
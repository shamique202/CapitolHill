const Post = require('../models/post');

module.exports = {
    create,
    deleteLike
};

async function create(req, res){
    try {
        const post = await Post.findById(req.params.id);
        post.likes.push({username: req.user.username, userId: req.user._id}); 
        await post.save() // saved here
        res.status(201).json({data: 'likes are now added'})
    } catch(err){      
        res.status(400).json({err})
    }
    
}

async function deleteLike(req, res){
    try {      
        const post = await Post.findOne({'likes._id': req.params.id, 'likes.username': req.user.username}); // likes is deleted once heart icon is unchecked
        post.likes.remove(req.params.id) 
        // req.params.id= like id 
        await post.save() // saved here 
        res.json({data: 'likes are now removed'})
    } catch(err){
        res.status(400).json({err})
    }
}
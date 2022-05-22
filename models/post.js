const mongoose = require('mongoose');

const likesSchema = mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    username: String
});
const postSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    photoUrl:String,
    description: String,
    likes: [likesSchema]
});
// always end with module.exports
module.exports = mongoose.model('Post', postSchema);
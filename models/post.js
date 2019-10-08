const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title:String,
    description:String,
    imagePath:String
});

const post = mongoose.model('Post',postSchema);

module.exports = post;



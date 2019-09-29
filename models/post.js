const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title:String,
    description:String
});

const post = mongoose.model('Post',postSchema);

module.exports = post;



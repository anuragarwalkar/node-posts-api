const express = require('express');
const router = express.Router();
const Post = require('../models/post')

router.get('/',async (req,res)=>{
    const allPosts = await Post.find();
    res.send(allPosts);
});

router.post('/',async(req,res)=>{
    const newPost = new Post({
        title:req.body.title,
        description:req.body.description
    })
    const dbCourse = await newPost.save()
    res.send(dbCourse);
})


module.exports = router;
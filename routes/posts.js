const express = require('express');
const router = express.Router();
const Post = require('../models/post');

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
});

router.delete('/:id',async(req,res)=>{
    const deleteRes = await Post.deleteOne({_id:req.params.id});
    // const updateData = await Post.find();
    res.send(deleteRes);
})

router.patch('/:id',async(req,res)=>{
    const updatedPost = await Post.findByIdAndUpdate({_id:req.params.id},{$set:req.body},{new:true});
    res.send(updatedPost);
})


module.exports = router;
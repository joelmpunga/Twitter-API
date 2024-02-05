
const express = require('express');
const posts = require('../model/postsModel');
const PostsGet = (req, res) =>{
    res.send('Hello World! Postes in controller!')
    posts.map(post => post.body)
    res.status(200).json(posts)
}
module.exports = PostsGet
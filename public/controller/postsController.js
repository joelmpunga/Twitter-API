
const express = require('express');
const app = express();

const PostsGet = (req, res) =>{
    res.send('Hello World! Postes in controller!');
}
module.exports = PostsGet
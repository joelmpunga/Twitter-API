
const express = require('express');
const routerPosts = express.Router();
const PostsGet = require('../controller/postsController.js')
router.get('', PostsGet)

module.exports = routerPosts

const express = require('express');
const router = express.Router();
const PostsGet = require('../controller/postsController.js')
const PostsPost = require('../controller/postsController.js')
const PostsPostId = require('../controller/postsController.js')
const PostsGetId = require('../controller/postsController.js')
const PostsPutId = require('../controller/postsController.js')
const PostsDeleteId = require('../controller/postsController.js')
router.post('/:id',PostsPostId)
router.get('/:id',PostsGetId)
router.get('', PostsGet)
router.post('',PostsPost)
router.put('/:id',PostsPutId)
router.delete('/:id',PostsDeleteId)
module.exports = router

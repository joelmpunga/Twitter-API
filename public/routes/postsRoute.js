
const express = require('express');
const router = express.Router();
const PostsGet = require('../controller/postsController.js')
router.get('', PostsGet)

module.exports = router

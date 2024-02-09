const express = require('express');
const router = express.Router();
const controllerPost=require('../controller/postsController.js')
const multer = require('../middleware/multer-config-middleware');
router.get('/:id',controllerPost.getOneById)
router.get('', controllerPost.PostsGet)
router.post('',multer,controllerPost.save)
router.put('/:id',multer,controllerPost.PostsPutId)
router.delete('/:id',controllerPost.PostsDeleteId)
router.put('/like/:id',controllerPost.PostsLikesId)
router.put('/repost/:id',controllerPost.PostsRepostsId)
module.exports = router

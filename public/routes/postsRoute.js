const express = require('express');
const router = express.Router();
const { getAll, getOneById, save, update, deleteOneById, like, repost }=require('../controller/postsController.js')
const multer = require('../middleware/multer-config-middleware');
router.get('/:id',getOneById)
router.get('', getAll)
router.post('',multer,save)
router.put('/:id',multer,update)
router.delete('/:id',deleteOneById)
router.put('/like/:id',like)
router.put('/repost/:id',repost)
module.exports = router

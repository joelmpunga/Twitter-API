const express = require('express');
const router = express.Router();
const { getAll, getAllWithResponse, getOneById, save, update, deleteOneById, like, repost,delike }=require('../controller/postsController.js')
const {isAuthenticated} = require('../controller/usersController.js')
const multer = require('../middleware/multer-config-middleware');
router.get('/:id',getOneById)
router.get('',getAllWithResponse)
router.post('',multer,save)
router.put('/:id',multer,update)
router.delete('/:id',deleteOneById)
router.get('/like/:id',like)
router.get('/delike/:id',delike)
router.put('/repost/:id',repost)
module.exports = router

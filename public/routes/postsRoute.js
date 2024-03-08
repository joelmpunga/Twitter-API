const express = require('express');
const router = express.Router();
const { getOnePostExec, getAllWithResponse,save, update, like,delike }=require('../controller/postsController.js')
const {authenticateToken} = require('../controller/usersController.js')
const multer = require('../middleware/multer-config-middleware');
router.get('',authenticateToken,getAllWithResponse)
router.get('/:id',authenticateToken,getOnePostExec)
router.post('',authenticateToken,multer,save)
router.put('/:id',authenticateToken,multer,update)
//router.delete('/:id',authenticateToken,deleteOneById)
router.put('/like/:id',authenticateToken,like)
router.put('/delike/:id',authenticateToken,delike)
//router.put('/repost/:id',authenticateToken,repost)
module.exports = router

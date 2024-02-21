const express = require('express');
const router = express.Router();
const { generateTokens, connexion, authenticateToken, getAll,create }=require('../controller/usersController.js')
//const multer = require('../middleware/multer-config-middleware');
// router.get('/:id',getOneById)
// router.get('', getAll)
//router.post('/login',authenticateToken,connexion)
router.post('/login',connexion)
router.post('/create',create)
router.get('', getAll)

//router.get('', authenticateToken, getAll)

// router.put('/:id',multer,update)
// router.delete('/:id',deleteOneById)
// router.put('/like/:id',like)
// router.put('/repost/:id',repost)
module.exports = router

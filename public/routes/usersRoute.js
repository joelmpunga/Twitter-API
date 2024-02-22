const express = require('express');
const app = express();
const session = require('express-session');
const router = express.Router();
const {userAuthToken,isAuthenticated,generateTokens, connexion, authenticateToken, getAll,getAllWithResponse,createUser, getOneUserExec}=require('../controller/usersController.js')
//const multer = require('../middleware/multer-config-middleware');
// router.get('', getAll)
//router.post('/login',authenticateToken,connexion)

router.get('/auth',userAuthToken)
router.post('/login',connexion)
router.post('/create',createUser)
router.get('', getAllWithResponse)
router.get('/:id',getOneUserExec)
//router.get('', authenticateToken, getAll)

// router.put('/:id',multer,update)
// router.delete('/:id',deleteOneById)
// router.put('/like/:id',like)
// router.put('/repost/:id',repost)
module.exports = router

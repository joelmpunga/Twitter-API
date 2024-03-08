const express = require('express');
const router = express.Router();
const {connexion, authenticateToken,getAllWithResponse,createUser, getOneUserExec}=require('../controller/usersController.js')

router.post('/login',connexion)
router.post('/create',authenticateToken,createUser)
router.get('',authenticateToken, getAllWithResponse)
router.get('/:id',authenticateToken,getOneUserExec)
module.exports = router

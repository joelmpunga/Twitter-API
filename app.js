const express = require('express')
const jwt = require('jsonwebtoken')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const app = express()
const dotenv = require('dotenv');
const session = require('express-session')
const cookieParser = require('cookie-parser')
const cors = require('cors')
dotenv.config();
const {userAuthToken,connexion} = require('./public/controller/usersController.js')
const port = process.env.PORT || 3000
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use('/posts', require('./public/routes/postsRoute.js'))
app.use('/users',require('./public/routes/usersRoute.js'))
//app.use('/users',userAuthToken, require('./public/routes/usersRoute.js'))

app.use(cookieParser())


function isAuthenticated (req, res, next) {
  if (req.session.user) next()
  else return res.status(403).json("Not authenticated");
}

app.post('/login', express.urlencoded({ extended: false }), userAuthToken)


app.listen(port, () => {
  console.log('app listening on port', port)
})
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
const {getAll, userAuthToken, connexion,isAuthenticated } = require('./public/controller/usersController.js')
const port = process.env.PORT || 3000
app.use(express.json());
app.use(cors())
app.use(session({
  name: process.env.SESSION_NAME,
  resave: false,
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false,
  }
}))

app.use(async (req, res,next) => {
  const {idUser} = req.session;
  const users = await getAll(req,res).then()
  if(idUser){
    res.locals.user = users.find(user => user.id === idUser)
  }
  next()
})

app.use(express.urlencoded({ extended: true }))
app.use('/posts', require('./public/routes/postsRoute.js'))
app.use('/users', require('./public/routes/usersRoute.js'))

app.use(cookieParser())
app.get('/',(req,res)=>{
  res.json(req.session)
})

app.listen(port, () => {
  console.log('app listening on port', port)
})
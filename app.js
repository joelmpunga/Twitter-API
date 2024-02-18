const express = require('express')
const jwt = require('jsonwebtoken')
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
const app = express()
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 3000
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use('/posts', require('./public/routes/postsRoute.js'))
app.use('/users', require('./public/routes/usersRoute.js'))
// const crypted = require('crypto').randomBytes(64).toString('hex')
// console.log(crypted);
// function isLogin(req, res, next) {
//   if (req.user) {
//       next();
//   }
//   else {
//       res.status(401).send('Non Autorisé')
//   }
// }

// app.use(isLogin);

async function createUser() {
  const users = await prisma.users.create({
    data: {
      name: 'John Doe',
      email: 'doe@example.com',
      username: 'doe24',
      password: 'john1234',
      profil: 'https://pbs.twimg.com/profile_images/1136589142035521536/6Y2g5se__400x400.png',
    }
  }
  )
  console.log(users);
}

async function createPost(idUser) {
  const posts = await prisma.users.create({
    data: {
      //idUser doit etre remplacé par la vraie valeur
      userId: idUser,
      text: "Hello everyone, i want to explain to you my main ideas",
      image: 'https://pbs.twimg.com/profile_images/1136589142035521536/6Y2g5se__400x400.png',
    }
  }
  )
  console.log(posts);
}

async function createComment(idPost, idUser) {
  const comments = await prisma.users.create({
    data: {
      idUser: idUser,
      idPost: idPost,
      text: "Hello everyone, i want to explain to you my main ideas",
    }
  }
  )
  console.log(comments);
}

// createUser().then(console.log)
// createPost(idUser).then(console.log)
// createComment(idPost,idUser).then(console.log)

const getAllUsers = await prisma.users.findMany();
const getAllPosts = await prisma.posts.findMany();
const getAllComments = await prisma.comments.findMany();

async function getOneUser(idUser) {
  const getOne = await prisma.users.findUnique({
    where: {
      id: idUser
    }
  })
  console.log(getOneUser);
}

async function getOnePost(idPost) {
  const getOne = await prisma.users.findUnique({
    where: {
      id: idUser
    }
  })
  console.log(getOnePost);
}

async function getOneComment(idComment) {
  const getOne = await prisma.users.findUnique({
    where: {
      id: idComment
    }
  })
  console.log(getOneComment);
}

app.listen(port, () => {
  console.log('app listening on port', port)
})
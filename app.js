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
      thumbnailProfil: 'https://pbs.twimg.com/profile_images/1136589142035521536/6Y2g5se__400x400.png'
    }
  }
  )
  console.log(users);
}

async function createPost() {
  const posts = await prisma.users.create({
    data: {
      userId: users.Int(users.id),
      text: "Hello everyone, i want to explain to you my main ideas",
      image: 'https://pbs.twimg.com/profile_images/1136589142035521536/6Y2g5se__400x400.png',
    }
  }
  )
  console.log(posts);
}

async function createComment() {
  const comments = await prisma.users.create({
    data: {
      userId: users.Int(users.id),
      text: "Hello everyone, i want to explain to you my main ideas",
      url: 'https://pbs.twimg.com/profile_images/1136589142035521536/6Y2g5se__400x400.png',
      thumbnailsUrl: 'https://pbs.twimg.com/profile_images/1136589142035521536/6Y2g5se__400x400.png',
    }
  }
  )
  console.log(comments);
}

createUser().then(console.log)
createPost().then(console.log)
createComment().then(console.log)

app.listen(port, () => {
  console.log('app listening on port', port)
})
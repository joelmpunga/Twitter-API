const express = require('express')
const jwt = require('jsonwebtoken')
const app = express()
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 3000
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
app.listen(port, () => {
  console.log('app listening on port',port)
})
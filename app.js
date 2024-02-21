const express = require('express')
const jwt = require('jsonwebtoken')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const app = express()
const dotenv = require('dotenv');
const session = require('express-session')
dotenv.config();
const port = process.env.PORT || 3000
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use('/posts', isAuthenticated, require('./public/routes/postsRoute.js'))
app.use('/users', require('./public/routes/usersRoute.js'))




app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

function isAuthenticated (req, res, next) {
  if (req.session.user) next()
  else return res.status(403).json("Not authenticated");
}


app.get('/', isAuthenticated, function (req, res) {
  // this is only called when there is an authentication user due to isAuthenticated
  res.send('hello, ' + escapeHtml(req.session.user) + '!' +
    ' <a href="/logout">Logout</a>')
})


app.post('/login', express.urlencoded({ extended: false }), function (req, res) {
  // login logic to validate req.body.user and req.body.pass
  // would be implemented here. for this example any combo works

  // regenerate the session, which is good practice to help
  // guard against forms of session fixation
  req.session.regenerate(function (err) {
    if (err) next(err)

    // store user information in session, typically a user id
    req.session.user = req.body.user

    // save the session before redirection to ensure page
    // load does not happen before session is saved
    req.session.save(function (err) {
      if (err) return next(err)
      res.redirect('/')
    })
  })
})

app.get('/logout', function (req, res, next) {
  // logout logic

  // clear the user from the session object and save.
  // this will ensure that re-using the old session id
  // does not have a logged in user
  req.session.user = null
  req.session.save(function (err) {
    if (err) next(err)

    // regenerate the session, which is good practice to help
    // guard against forms of session fixation
    req.session.regenerate(function (err) {
      if (err) next(err)
      res.redirect('/')
    })
  })
})

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
  console.log('app listening on port', port)
})
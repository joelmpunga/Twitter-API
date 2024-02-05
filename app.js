const express = require('express')
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', require('./public/routes/postsRoute.js'))

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})
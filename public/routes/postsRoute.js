
const express = require('express');
const app = express();
const routes = app.routes();
routes.get('/', function(req, res) {
  res.send('Hello World!');
});

const express = require('express');
const app = express();
const axios = require('axios');
const posts = [];
app.get('/posts', (req, res) => {
    axios.get(`https://my-json-server.typicode.com/amare53/twiterdb/posts`)
        .then(response => {
            posts = res.json(response.data)
        })
})


module.exports = posts
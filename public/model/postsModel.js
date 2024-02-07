const express = require('express');
const app = express();
const axios = require('axios');
const posts = [
    {
        "userId":4,
        "id":1,
        "title":"mon titre",
        "body":"mon body",		"url":"https://via.placeholder.com/600/92c952",	"thumbnailsUrl":"https://via.placeholder.com/150/92c952",
        "like":60,
        "repost":10	
    },
    {
        "userId":7,
        "id":2,
        "title":"mon titre",
        "body":"mon body",		"url":"https://via.placeholder.com/600/92c952",	"thumbnailsUrl":"https://via.placeholder.com/150/92c952",
        "like":30,
        "repost":100	
    }
];
// app.use('', (req, res) => {
//     axios.get(`https://my-json-server.typicode.com/amare53/twiterdb/posts`)
//         .then(response => {
//             posts = res.json(response.data)
//         })
// })


module.exports = posts
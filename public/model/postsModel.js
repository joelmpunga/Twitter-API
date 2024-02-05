const express= require('express');
const app = express();
const posts = [];
axios.get(`https://my-json-server.typicode.com/amare53/twiterdb/comments`)
.then(res => {
    posts=(res.data);
})

module.exports = posts
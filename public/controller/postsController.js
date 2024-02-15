const posts = require('../model/postsModel');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid')
const {file} = require('multer')
const getAll = (req, res) => {
    res.status(200).json(posts)
}


const save = (req, res) => {
    const post = req.body
    const id = uuidv4()
    post.id = id
    post.like = 0
    post.repost = 0
    if (post.title.length < 3 || post.body.length < 3 || post.url.match(/[\z]/) || post.thumbnailsUrl.match(/[\z]/)) {
        return res.status(400).send('Post not  ');
    }
    const thingObject = req.file ? {
        imageUrl: `../images/${req.file.filename}`
    } : req.body
    //posts.push(post)
    res.status(201).json(thingObject)
}
const getOneById = (req, res) => {
    const id = req.params.id
    const post = posts.filter(posts => posts.id == id)
    res.json(post)
}
const update = (req, res) => {
    const id = req.params.id
    let postId = posts.findIndex((posts => posts.id === id));
    let post = (req.body)
    validate (req, 'Post to modify not found')
    post.id = id
    posts[postId] = post
    res.status(200).json(posts);
}
const like = (req, res) => {
    const id = req.params.id
    let postId = posts.findIndex((posts => posts.id === id));
    if (postId === (-1)) {
        return res.status(400).send('Post to like not found');
    }
    posts[postId].like += 1
    res.status(200).json(posts);
}
const repost = (req, res) => {
    const id = req.params.id
    let postId = posts.findIndex((posts => posts.id === id));
    if (postId === (-1)) {
        return res.status(400).send('Post to repost not found');
    }
    posts[postId].repost += 1
    res.status(200).json(posts);
}
const deleteOneById = (req, res) => {
    const id = req.params.id
    let postId = posts.findIndex((posts => posts.id === id));
    if (postId == (-1)) {
        return res.status(404).send('Post to delete not found');
    }
    posts.splice(postId, 1)
    res.status(200).json(posts);
}
const validate = (req, textOnError) => {
    if (req.body.title.length < 3 || req.body.body.length < 3 || req.body.url.match(/[\z]/) || req.body.thumbnailsUrl.match(/[\z]/)) {
        return res.status(400).send(textOnError);
    }
}
module.exports = { getAll, getOneById, save, update, deleteOneById, like, repost }

const posts = require('../model/postsModel');
const { v4: uuidv4 } = require('uuid')
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
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : req.body
    posts.push(post)
    res.status(201).json(posts)
}

const getOneById = (req, res) => {
    const id = req.params.id
    const post = posts.filter(posts => posts.id == id)
    res.json(post)
}

const update = (req, res) => {
    const id = Number(req.params.id)
    let existingPostId = posts.findIndex((posts => posts.id === id));
    let post = (req.body)
    if (post.title.length < 3 || post.body.length < 3 || post.url.match(/[\z]/) || post.thumbnailsUrl.match(/[\z]/)) {
        return res.status(400).send('Post to modify not found');
    }
    post.id = id
    posts[existingPostId] = post
    res.status(200).json(posts);
}

const like = (req, res) => {
    const id = Number(req.params.id)
    let existingPostId = posts.findIndex((posts => posts.id === id));
    if (existingPostId === (-1)) {
        return res.status(400).send('Post to like not found');
    }
    posts[existingPostId].like += 1
    res.status(200).json(posts);
}

const repost = (req, res) => {
    const id = Number(req.params.id)
    let existingPostId = posts.findIndex((posts => posts.id === id));
    if (existingPostId === (-1)) {
        return res.status(400).send('Post to repost not found');
    }
    posts[existingPostId].repost += 1
    res.status(200).json(posts);
}

const deleteOneById = (req, res) => {
    const id = Number(req.params.id)
    let existingPostId = posts.findIndex((posts => posts.id === id));
    if (existingPostId == (-1)) {
        return res.status(404).send('Post to delete not found');
    }
    posts.splice(existingPostId, 1)
    res.status(200).json(posts);
}

module.exports = { getAll, getOneById, save, update, deleteOneById, like, repost }
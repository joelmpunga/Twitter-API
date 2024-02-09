
const posts = require('../model/postsModel');
const {v4:uuidv4} = require('uuid')
const PostsGet = (req, res) => {
    res.status(200).json(posts)
}

const PostsPost = (req, res) => {
    const post = req.body
    const id = uuidv4()
    post.id = id
    if(post.title.length < 3 || post.body.length < 3 || post.url.match(/[\z]/) || post.thumbnailsUrl.match(/[\z]/)) {
        return res.status(400).send('Posts not avalidated');
    }

    const thingObject = req.file?{
        imageUrl:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      }:req.body
    posts.push(post)
    res.status(201).json(posts)
}

const PostsGetId = (req, res) => {
    const id = req.params.id
    const post = posts.filter(posts => posts.id == id)
    res.json(post)
}

const PostsPutId = (req, res) => {
    const id = Number(req.params.id)
    let existingPostId = posts.findIndex((posts => posts.id === id));
    let post = (req.body)
    if (post.title.length < 3 || post.body.length < 3 || post.url.match(/[\z]/) || post.thumbnailsUrl.match(/[\z]/)) {
        return res.status(400).send('Posts not avalidated');
    }
    post.id = id
    posts[existingPostId] = post
    res.status(200).json(posts);
}

const PostsLikesId = (req, res) => {
    const id = Number(req.params.id)
    let existingPostId = posts.findIndex((posts => posts.id === id));
    if (existingPostId ===(-1)) {
        return res.status(400).send('Post not avalidated');
    }
    posts[existingPostId].like += 1
    res.status(200).json(posts);
}

const PostsRepostsId = (req, res) => {
    const id = Number(req.params.id)
    let existingPostId = posts.findIndex((posts => posts.id === id));
    if (existingPostId ===(-1)) {
        return res.status(400).send('Post not avalidated');
    }
    posts[existingPostId].repost += 1
    res.status(200).json(posts);
}

const PostsDeleteId = (req, res) => {
    const id = Number(req.params.id)
    let existingPostId = posts.findIndex((posts => posts.id === id));
    if (existingPostId==(-1)) {
        return res.status(404).send('Post to delete not found');
    }
    posts.splice(existingPostId, 1)
    res.status(200).json(posts);
}

module.exports = { PostsGet, PostsGetId, PostsPost, PostsPost, PostsPutId, PostsDeleteId,PostsLikesId,PostsRepostsId }
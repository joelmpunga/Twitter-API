
const express = require('express');
const posts = require('../model/postsModel');
const PostsGet = (req, res) => {
    res.status(200).json(posts)
}

const PostsPost = (req, res) => {
    const post = req.body
    const id = posts.length + 1
    post.id = id
    posts.push(post)
    res.json(posts)
}

const PostsGetId = (req, res) => {
    const id = req.params.id
    const post = posts.filter(posts => posts.id == id)
    res.json(post)
}

const PostsPostId = (req, res) => {
    const id = req.params.id
    const post = req.body
    posts.push(post)
    res.json(posts)
}


const PostsPutId = (req, res) => {
    const id = Number(req.params.id)
    let existingPostId = posts.findIndex((posts => posts.id === id));
    let post = (req.body)
    if (!posts) {
        return res.status(404).send('Posts not found');
    }
    post.id = id
    posts[existingPostId] = post
    res.status(200).json(posts);
}

const PostsDeleteId = (req, res) => {
    const id = Number(req.params.id)
    let existingPostId = posts.findIndex((posts => posts.id === id));
    if (!posts) {
        return res.status(404).send('Posts not found');
    }
    posts.splice(existingPostId, 1)
    res.status(200).json(posts);
}

module.exports = PostsGet
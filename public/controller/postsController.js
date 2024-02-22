const { createPost, getAllPosts, getOnePost, modifyPost, deleteOnePost } = require('../model/postsModel');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid')
const { file } = require('multer')
const { PrismaClient } = require('@prisma/client');
const { response } = require('express');
const prisma = new PrismaClient()

const getAll = async (req, res) => {
    const getPosts = await prisma.posts.findMany().then()
    return getPosts
}

const getAllWithResponse = async (req, res) => {
    const getPosts = await prisma.posts.findMany().then()
    return res.json(getPosts)
}

const save = async (req, res) => {
    const post = req.body
    const { text, image } = req.body
    const id = uuidv4()
    post.id = id
    post.like = 0
    post.repost = 0
    post.userId = req.body.userId
    post.text = text
    post.image = image
    let ident = req.session.idUser
    if (!ident) {
        return res.status(401).json({ "message": "Vous n'etes plus connecté" })
    }
    //idUser vaut 1 cette données doit changer
    createPost(ident, id).catch((e) => {
        throw e;
    })
    res.json(post)
    // if (post.title.length < 3 || post.body.length < 3 || post.url.match(/[\z]/) || post.thumbnailsUrl.match(/[\z]/)) {
    //     return res.status(400).send('Post not  ');
    // }
    // const thingObject = req.file ? {
    //     imageUrl: `../images/${req.file.filename}`
    // } : req.body
    //posts.push(post)
    //res.status(201).json(thingObject)
}
const getOneById = (req, res) => {
    const id = req.params.id
    const post = posts.filter(posts => posts.id == id)
    res.json(post)
}

const update = async (req, res) => {
    let idPost = req.params.id
    const posts = await prisma.posts.update({
        where: {
            id:
            {
                equals: idPost
            }
        },
        data: {
            userId: idUser,
            text: "Hello everyone, i want to explain to you my main ideas modified",
            image: 'https://pbs.twimg.com/profile_images/1136589142035521536/6Y2g5se__400x400.png',
        }
    }
    ).then()
    res.json(posts)
    return posts
}


const like = async (req, res) => {
    let idPost = req.params.id
    let allPosts = await getAll(req, res).then()
    let currentLikes = allPosts.find((post => post.id === idPost))
    console.log("the post ", currentLikes, typeof idPost);
    if (currentLikes) {
        const idPostString = idPost.toString();
        const posts = await prisma.posts.update({
            where: {
                id: idPostString,
            },
            data: {
                like: currentLikes.like + 1,
            }
        }
        ).then()
        allPosts = await getAll(req, res).then()
        return res.status(200).json(allPosts)
    }
    else {
        return res.status(400).send('Post to like not found');
    }
}

const delike = async (req, res) => {
    let idPost = req.params.id
    let allPosts = await getAll(req, res).then()
    let currentLikes = allPosts.find((post => post.id === idPost))
    console.log("the post ", currentLikes, typeof idPost);
    if (currentLikes) {
        const idPostString = idPost.toString();
        const posts = await prisma.posts.update({
            where: {
                id: idPostString,
            },
            data: {
                like: currentLikes.like - 1,
            }
        }
        ).then()
        allPosts = await getAll(req, res).then()
        return res.status(200).json(allPosts)
    }
    else {
        return res.status(400).send('Post to like not found');
    }
}

// const update = (req, res) => {
//     const id = req.params.id
//     let postId = posts.findIndex((posts => posts.id === id));
//     let post = (req.body)
//     validate(req, 'Post to modify not found')
//     post.id = id
//     posts[postId] = post
//     res.status(200).json(posts);
// }
// const like = (req, res) => {
//     const id = req.params.id
//     let postId = posts.findIndex((posts => posts.id === id));
//     if (postId === (-1)) {
//         return res.status(400).send('Post to like not found');
//     }
//     posts[postId].like += 1
//     res.status(200).json(posts);
// }

// const delike = (req, res) => {
//     const id = req.params.id
//     let postId = posts.findIndex((posts => posts.id === id));
//     if (postId === (-1)) {
//         return res.status(400).send('Post to delike not found');
//     }
//     posts[postId].like -= 1
//     res.status(200).json(posts);
// }

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
module.exports = { getAll, getAllWithResponse, getOneById, save, update, deleteOneById, like, repost, delike }
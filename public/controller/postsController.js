const { createPost, getAllPosts, getOnePost, modifyPost, deleteOnePost } = require('../model/postsModel');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid')
const { file } = require('multer')
const { PrismaClient } = require('@prisma/client');
const { response } = require('express');
const prisma = new PrismaClient()

const getAll = async (req, res) => {
    const getPosts = await prisma.posts.findMany().then().catch((e) => {
        throw e;
    })
        .finally(async () => {
            await prisma.$disconnect();
        });
    return getPosts
}

const getAllWithResponse = async (req, res) => {
    const getPosts = await prisma.posts.findMany({
        relationLoadStrategy: 'join',
        include: {
            users: true,
        },
    }).catch((e) => {
        throw e;
    })
        .finally(async () => {
            await prisma.$disconnect();
        });
    return res.json(getPosts)
}

const getOnePostExec = async (req, res) => {
    const idPost = req.params.id
    const getOne = await getOnePost(idPost)
    return res.json(getOne)
}

const save = async (req, res) => {
    // const post = req.body
    const { text } = req.body
    const id = uuidv4()
    const post = req.file ? {
        ...req.body,
        imageUrl: `../images/${req.file.filename}`
    } : req.body
    post.id = id
    post.like = 0
    post.repost = 0
    post.userId = req.body.userId
    post.text = text
    if (!post.image) post.image = ""
    let ident = req.session.idUser
    if (!ident) {
        return res.status(401).json({ "message": "Vous n'etes plus connecté" })
    }
    createPost(ident, id, post).catch((e) => {
        throw e;
    })
    res.status(201).json(post)
}

const update = async (req, res) => {
    let idPost = req.params.id
    const post = req.file ? {
        image: `../images/${req.file.filename}`
    } : req.body
    //const {text,image} = req.body
    const posts = await prisma.posts.update({
        where: {
            id: idPost
        },
        data: {
            text: post.text,
            image: post.image,
        }
    }
    ).then().catch((e) => {
        throw e;
    })
        .finally(async () => {
            await prisma.$disconnect();
        });
    res.json(posts)
    return posts
}


const like = async (req, res) => {
    let idPost = req.params.id
    let allPosts = await getAll(req, res).then()
    let currentLikes = allPosts.find((post => post.id === idPost))
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
        ).then().catch((e) => {
            throw e;
        })
            .finally(async () => {
                await prisma.$disconnect();
            });
        //return res.redirect("http://localhost:5173/")
        allPosts = await getAll(req, res).then()
        return res.status(200).json(allPosts)
    }
    else {
        //return res.redirect("http://localhost:5173/")
        return res.status(400).send('Post to like not found');
    }
}

const delike = async (req, res) => {
    let idPost = req.params.id
    let allPosts = await getAll(req, res).then()
    let currentLikes = allPosts.find((post => post.id === idPost))
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
        return res.status(400).send('Post to delike not found');
    }
}

module.exports = { getAll, getAllWithResponse, getOnePostExec, save, update, like, delike }
const { PrismaClient } = require('@prisma/client');
const { User } = require('./usersModel');
const prisma = new PrismaClient()
//cet ID,username, password viennent de la base de donnees et de l'utilisateur qui est conncté
//console.log(User.id);
async function createPost(idUser, idPost) {
    const postCreated = await prisma.posts.create({
        data: {
            id: idPost,
            text: "Hello everyone, i want to explain to you my main ideas",
            image: 'https://pbs.twimg.com/profile_images/1136589142035521536/6Y2g5se__400x400.png',
            users:{
                connect:{
                    id:idUser
                }
            }
        }
    }
    )
    return postCreated
}

//createPost(idUser).then(console.log)

async function getAllPosts () {
    
    console.log("GET ALL AVANT")
    return getPosts
}
async function getOnePost(idPost) {
    const getOne = await prisma.posts.findFirst({
        where: {
            id: idUser
        }
    })
    return getOne
}

async function modifyPost(idPost) {
    const posts = await prisma.posts.update({
        where: {
            id: idPost
        },
        data: {
            userId: idUser,
            text: "Hello everyone, i want to explain to you my main ideas",
            image: 'https://pbs.twimg.com/profile_images/1136589142035521536/6Y2g5se__400x400.png',
        }
    }
    )
    return posts
}

async function deleteOnePost(idPost) {
    const deleteOneById = await prisma.posts.delete({
        where: {
            id: idPost
        }
    })
    return deleteOneById
}
// const postGre = require('pg')

// postGre.connect(
//     {
//         host: 'localhost',
//         user: 'postgres',
//         password: '<PASSWORD>',
//         database: 'postgre',
//         port: 5432
//     }
// )
//  .then(client => {
//     client.query('SELECT * FROM posts')
//    .then(res => {
//         console.log(res.rows)
//       })

//  })

// {
//     "userId":4,
//     "id":1,
//     "title":"mon titre",
//     "body":"mon body",		
//     "url":"https://via.placeholder.com/600/92c952",	
//     "thumbnailsUrl":"https://via.placeholder.com/150/92c952",
//     "like":60,
//     "repost":10	
// },
const posts = [{
    "userId": 4,
    "title": "mon titre",
    "body": "mon body",
    "url": "https://via.placeholder.com/600/92c952",
    "thumbnailsUrl": "https://via.placeholder.com/150/92c952",
    "like": 0,
    "repost": 0,
    "id": "49969127-22ea-4f59-acae-40ddb94899f9"
},
{
    "userId": 4,
    "title": "mon titre",
    "body": "mon body",
    "url": "https://via.placeholder.com/600/92c952",
    "thumbnailsUrl": "https://via.placeholder.com/150/92c952",
    "like": 0,
    "repost": 0,
    "id": "302f1548-b095-499d-b394-5ade011c8562"
}];
module.exports = { createPost, getAllPosts, getOnePost, modifyPost, deleteOnePost}
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
async function createPost(idUser, idPost,data) {
    const postCreated = await prisma.posts.create({
        data: {
            id: idPost,
            text: data.text,
            image: data.image,
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

async function getAllPosts () {
    return getPosts
}
async function getOnePost(idPost) {
    const getOne = await prisma.posts.findFirst({
        where: {
            id: idPost
        }
    }).catch((e)=>{
        throw e;
      })
      .finally(async ()=>{
        await prisma.$disconnect();
      });
    return getOne
}

async function modifyPost(idPost,data) {
    const posts = await prisma.posts.update({
        where: {
            id: idPost
        },
        data: {
            userId: idPost,
            text: data.text,
            image:data.image,
        }
    }
    ).catch((e)=>{
        throw e;
      })
      .finally(async ()=>{
        await prisma.$disconnect();
      });
    return posts
}

async function deleteOnePost(idPost) {
    const deleteOneById = await prisma.posts.delete({
        where: {
            id: idPost
        }
    }).catch((e)=>{
        throw e;
      })
      .finally(async ()=>{
        await prisma.$disconnect();
      });
    return deleteOneById
}

module.exports = { createPost, getAllPosts, getOnePost, modifyPost, deleteOnePost}
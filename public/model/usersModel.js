const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcrypt')
const session = require('express-session')
const express = require('express')

const app = express()

const getOneUser = async(idUser) =>{
    const getOne = await prisma.users.findFirst({
        where: {
            id:
            {
                equals: idUser,
            }
        }
    }).then()
    return getOne
}

//not useded 
const verifPassword  = (password,hash) => {
    bcrypt.compare(password, hash, function (err,res){
        console.log(res)
    });
}

//not useded 
async function userConnexion(username, password) {
    const hash = await getOneUser()
    verifPassword (password,hash)
    const getOne = await prisma.users.findUnique({
        where: {
            username: username,
            password: password,
        }
    }).catch((e)=>{
        throw e;
      })
      .finally(async ()=>{
        await prisma.$disconnect();
      });
    return getOne
}

async function getAllUsers() {
    const getUsers = await prisma.users.findMany().catch((e)=>{
        throw e;
      })
      .finally(async ()=>{
        await prisma.$disconnect();
      });
    return getUsers;
}

module.exports = { getOneUser, getAllUsers,userConnexion}
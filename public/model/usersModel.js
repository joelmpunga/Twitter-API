const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcrypt');

async function getOneUser(idUser) {
    const getOne = await prisma.users.findUnique({
        where: {
            id: idUser
        }
    }).then()
}

const verifPassword  = (password,hash) => {
    bcrypt.compare(password, hash, function (err,res){
        console.log(res)
    });
}
async function userConnexion(username, password) {
    //const hash = await getOneUser()
    verifPassword (password,hash)
    const getOne = await prisma.users.findUnique({
        where: {
            username: username,
            password: password,
        }
    })
    return getOne
}

async function getAllUsers() {
    const getUsers = await prisma.users.findMany();
    return getUsers;
}

const username="doe24";
const password="john1234";
const User = userConnexion(username,password).then().catch((e)=>{
      throw e;
    })
    .finally(async ()=>{
      await prisma.$disconnect();
    });

async function createUser() {
    bcrypt.genSalt (10, function (err, salt) {
        bcrypt.hash("john1234", salt, function (err, hash) {
            console.log(hash);
        });
    })
    const users = await prisma.users.create({
        data: {
            name: 'John Doe',
            email: 'doe@example.com',
            username: 'doe24',
            password: 'john1234',
            profil: 'https://pbs.twimg.com/profile_images/1136589142035521536/6Y2g5se__400x400.png',
        }
    }
    )
    console.log(users);
}

// createUser().then(console.log).catch((e)=>{
//   throw e;
// })
// .finally(async ()=>{
//   await prisma.$disconnect();
// })

const users = {
    "id": 1,
    "name": "Aime Nzolo",
    "username": "aimenzolo",
    "email": "aime@kadea.co",
    "profil": "https://pbs.twimg.com/profile_images/1136589142035521536/6Y2g5se__400x400.png",
    "thumbnailProfil": "https://pbs.twimg.com/profile_images/1136589142035521536/6Y2g5se__400x400.png",
    "Joined": "Joined October 2011"
}

module.exports = { getOneUser, getAllUsers,createUser,userConnexion,User}
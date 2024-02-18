async function getOneUser(idUser) {
    const getOne = await prisma.users.findUnique({
        where: {
            id: idUser
        }
    })
    console.log(getOne);
}

async function getAllUsers() {
    const getUsers = await prisma.users.findMany();
    console.log(getUsers);
}

async function createUser() {
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

module.exports = { users }
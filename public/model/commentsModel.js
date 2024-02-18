async function getOneComment(idComment) {
    const getOne = await prisma.comments.findUnique({
        where: {
            id: idComment
        }
    })
    console.log(getOne);
}

async function getAllComments() {
    const getComments = await prisma.comments.findMany();
    console.log(getComments);
}

async function createComment(idPost, idUser) {
    const comments = await prisma.users.create({
        data: {
            idUser: idUser,
            idPost: idPost,
            text: "Hello everyone, i want to explain to you my main ideas",
        }
    }
    )
    console.log(comments);
}

// createComment(idPost,idUser).then(console.log).catch((e)=>{
//   throw e;
// })
// .finally(async ()=>{
//   await prisma.$disconnect();
// })

const comments = {
    "postId": 1,
    "userId": 2,
    "id": 1,
    "text": "id labore ex et quam laborum"
}
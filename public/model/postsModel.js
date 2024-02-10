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
},{
    "userId": 4,
    "title": "mon titre",
    "body": "mon body",
    "url": "https://via.placeholder.com/600/92c952",
    "thumbnailsUrl": "https://via.placeholder.com/150/92c952",
    "like": 0,
    "repost": 0,
    "id": "302f1548-b095-499d-b394-5ade011c8562"
}];
module.exports = posts
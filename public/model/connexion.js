const {Client} = require('pg');
const {host, port, user, password, database} =require('./config');
const client = new Client({
    host: host,
    user: user,
    password: password,
    database: database,
    port: port,
});

client.connect()

try{
    client.query('SELECT * FROM posts',(err,res)=>{
        if(err) throw err;
        else{
            return res.rows
        }
        client.end();
    })
}
catch(err){
    console.log(err)
}


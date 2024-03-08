const express = require('express')
const app = express()
const jwt = require('jsonwebtoken');
const { getOneUser, getAllUsers } = require('../model/usersModel');
const { json } = require('express');
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const session = require('express-session')
let users = getAllUsers()
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser')
const bcrypt = require('bcrypt')
app.use(cookieParser())
dotenv.config();

const getAll = async (req, res) => {
    return getUsers = await prisma.users.findMany().then().catch((e)=>{
        throw e;
      })
      .finally(async ()=>{
        await prisma.$disconnect();
      });
}

const getAllWithResponse = async (req, res) => {
    const getUsers = await prisma.users.findMany().then().catch((e)=>{
        throw e;
      })
      .finally(async ()=>{
        await prisma.$disconnect();
      });
    return res.json(getUsers)
}

const createUser = async (req, res) => {
    const { name, email, password, username, profil } = req.body
    const allUsers = await getAll(req, res).then().catch((e)=>{
        throw e;
      })
      .finally(async ()=>{
        await prisma.$disconnect();
      });
    const user = allUsers.find((user) => user.username === username || user.email === email)
    if (user) {
        const passwordHashed = await bcrypt.compare(password, user.password)
        if (passwordHashed) {
            res.status(401).json({ "message": "This password and username already exist." })
        }
        else {
            return res.status(401).json({ "message": "This password and username already exist." })
        }
    }
    bcrypt.genSalt(10, async function (err, salt) {
        bcrypt.hash('john12345', salt, async function (err, hash) {
            const users = await prisma.users.create({
                data: {
                    name: name,
                    email: email,
                    username: username,
                    password: hash,
                    profil: profil,
                }
            }
            ).catch((e)=>{
                throw e;
              })
              .finally(async ()=>{
                await prisma.$disconnect();
              });
            res.json(users)
        });
    })
}

async function getOneUserExec(req, res) {
    let idUser = Number(req.params.id);
    const getOne = await prisma.users.findFirst({
        where: {
            id: {
                equals: idUser,
            }
        }
    }).then().catch((e)=>{
        throw e;
      })
      .finally(async ()=>{
        await prisma.$disconnect();
      });
    res.json(getOne);
    return getOne
}


function generateTokens(user) {
    const payload = {
        username: user.username,
        password: user.password
    }
    return jwt.sign(payload, process.env.TOKEN_SECRET_KEY, { expiresIn: '1800s' });
}

function verifyToken(token) {
    return decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY)
}

function sendToken(res, token) {
    const options = {
        httpOnly: true,
        maxAge: 60 * 60 * 1000
    };
    res.cookie('token', token, options)
}

function getToken(req, res) {
    const token = req.cookies.token;
    return token;
}

// function getCookie(req, name) {
//     let cookie = req.headers.cookie;
//     let pairs = cookie.split(';');
//     for (let i = 0; i < pairs.length; i++) {
//         let pair = pairs[i].trim().split('=');
//         if (pair[0] === name) {
//             return pair[1];
//         }
//     }
//     return null
// }


const connexion = async (req, res) => {
    const { username, password } = req.body
    if (!username) return res.status(403).json({ message: "No information provided" })
    const user = await prisma.users.findFirst(
        {
            where: {
                username: username,
            }
        }
    ).then().catch((e)=>{
        throw e;
      })
      .finally(async ()=>{
        await prisma.$disconnect();
      });
    if (username && password) {
        if (user) {
            const passwordHashed = await bcrypt.compare(password, user.password)
            if (passwordHashed) {
                req.session.idUser = user.id
                const token = jwt.sign({ username, password }, process.env.TOKEN_SECRET_KEY)
                user.token = token
                req.session.token = token
                sendToken(res, token)
                //return res.redirect("http://localhost:5173/")
                res.json(req.session)
            }
        }
        //return res.redirect("http://localhost:5173/login")
    }
}

const authenticateToken = (req, res, next) => {
    if (req.session.token) {
        jwt.verify(req.session.token, process.env.TOKEN_SECRET_KEY, (err, user) => {
            if (err) return res.status(403).json({ "message": "An error occurred while verifying" })
            req.user = user
            next()
        })
    }
    else {
        const authHeader = req.headers['authorization']
        if (!authHeader) return res.status(401).json({ "message": "Not authenticated  or authorization low to acces to this ressources" })
        const token = authHeader && authHeader.split(' ')[1]
        if (token == null) return res.status(401).json({ "message": "You're not allow to access" })
        jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, user) => {
            if (err) return res.status(403).json({ "message": "An error occurred while verifying" })
            req.user = user
            next()
        })
    }
}

const isAuthenticated = (req, res, next) => {
    if (req.session.idUser) next()
    else return res.status(403).json("Not authenticated");
}

module.exports = { getAllWithResponse, isAuthenticated, getOneUserExec, generateTokens, connexion, authenticateToken, getAll, createUser }
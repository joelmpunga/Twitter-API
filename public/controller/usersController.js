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
    const getUsers = await prisma.users.findMany().then()
    return getUsers
}

const getAllWithResponse = async (req, res) => {
    const getUsers = await prisma.users.findMany().then()
    return res.json(getUsers)
}

// const create = (req, res) => {
//     createUser()
//     users = getAllUsers()
//     res.status(200).json(users)
// }

const createUser = async (req, res) => {
    const { name, email, password, username, profil } = req.body
    const allUsers = await getAll(req, res).then()
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
        bcrypt.hash(password, salt, async function (err, hash) {
            const users = await prisma.users.create({
                data: {
                    name: name,
                    email: email,
                    username: username,
                    password: hash,
                    profil: profil,
                }
            }
            )
            console.log(users);
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
    }).then()
    res.json(getOne);
    return getOne
}

const getOneById = (req, res) => {
    const id = req.params.id
    const user = posts.filter(users => posts.id == id)
    res.json(post)
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

function getToken(req) {
    const token = req.cookies.token;
    return token;
}

function getCookie(req, name) {
    let cookie = req.headers.cookie;
    let pairs = cookie.split(';');
    for (let i = 0; i < pairs.length; i++) {
        let pair = pairs[i].trim().split('=');
        if (pair[0] === name) {
            return pair[1];
        }
    }
    return null
}

function userAuthToken(req, res) {
    const user = req.body;
    if (user.username == "doe" && user.password == "doe1234") {
        const token = generateTokens(user);
        sendToken(res, token)
        res.status(200).json(token)
    }
}

const connexion = async (req, res) => {
    const users = await getAll(req, res).then()
    const { username, password } = req.body
    if (username && password) {
        const user = users.find((user) => user.username === username)
        if (user) {
            const passwordHashed = await bcrypt.compare(password, user.password)
            if (passwordHashed) {
                req.session.idUser = user.id
                // const token = getToken(req);
                // if (token) {
                //     const user = verifyToken(token);
                //     const token = generateTokens(user);
                //     sendToken(res, token)
                //     res.status(200).json(token)
                // }
                res.json(req.session)
            }
        }
    }
}

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    if (!authHeader) return res.sendStatus(401)
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
    jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, user) => {
        console.log(err)
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

const isAuthenticated = (req, res, next) => {
    console.log('session', req.session);
    if (req.session.idUser) next()
    else return res.status(403).json("Not authenticated");
}

module.exports = {getAllWithResponse, isAuthenticated, getOneUserExec, generateTokens, connexion, authenticateToken, getAll, userAuthToken, getCookie, createUser }
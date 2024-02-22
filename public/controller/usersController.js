const express = require('express')
const app = express()
const jwt = require('jsonwebtoken');
const { getOneUser, getAllUsers, createUser } = require('../model/usersModel');
const { json } = require('express');
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const session = require('express-session')
let users = getAllUsers()
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser')
app.use(cookieParser())
dotenv.config();


const getAll = async (req, res) => {
    const getUsers = await prisma.users.findMany().then()
    res.json(getUsers);
    return getUsers
}

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}))

const create = (req, res) => {
    createUser()
    users = getAllUsers()
    res.status(200).json(users)
}

async function getOneUserExec(req, res) {
    let idUser = Number(req.params.id);
    console.log(idUser);
    const getOne = await prisma.users.findFirst({
        where: {
            id: {
                equals: idUser,
            }
        }
    }).then()
    res.json(getOne);
    console.log(getOne);
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

const connexion = (req, res) => {
    const token = getCookie(req, 'token');
    if (token) {
        const user = verifyToken(token);
        const token = generateTokens(user);
        sendToken(res, token)
        res.status(200).json(token)
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

module.exports = { getOneUserExec, generateTokens, connexion, authenticateToken, getAll, create, userAuthToken, getCookie }
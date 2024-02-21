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
dotenv.config();
const getAll = (req, res) => {
    res.status(200).json(users)
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

const getOneById = (req, res) => {
    const id = req.params.id
    const user = posts.filter(users => posts.id == id)
    res.json(post)
}


function generateTokens(user) {
    const payload = {
        id: user.id,
        username: user.username,
        password: user.password
    }
    return jwt.sign(payload, process.env.TOKEN_SECRET_KEY, { expiresIn: '1800s' });
}

function verifyToken (token) {
    return  decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY)
}

function sendToken (res,token) {
    const options = {
        httpOnly: true,
        secure: true,
        maxAge: 60*60*1000
    };
    res.cookie('token', token, options)
}

function getToken(req) {
    const token = req.cookies.token;
    return token;
}

const connexion = (req, res) => {
    const token = generateTokens({id:req.body.id, username: req.body.username, password: req.body.password })
    const secret = process.env.TOKEN_SECRET_KEY;
    const payload = jwt.verify(token, secret)
    console.log(payload.password, password, payload.username, username);
    if (payload.password === password || payload.username === username) {
        res.status(200).json(token)
    }
    else {
        res.status(401).json("Bad Request")
    }
    // req.session.regenerate(function (err) {
    //     if (err) next(err)
    //     req.session.user = req.body.user
    //     req.session.save(function (err) {
    //         if (err) return next(err)
    //         res.status(200).json(req.session.user + " est le token est " + token)
    //     })
    // })
    res.status(200).json(token)
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

module.exports = { generateTokens, connexion, authenticateToken, getAll, create }
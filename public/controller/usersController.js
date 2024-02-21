const jwt = require('jsonwebtoken');
const { getOneUser, getAllUsers, createUser } = require('../model/usersModel');
const { json } = require('express');
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const session = require('express-session')
const express = require('express')
let users = getAllUsers()
const dotenv = require('dotenv');
dotenv.config();
const getAll = (req, res) => {
    res.status(200).json(users)
}

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


function generateTokens(username) {
    return jwt.sign(username, process.env.TOKEN_SECRET_KEY, { expiresIn: '1800s' });
}

const connexion = (req, res) => {
    const token = generateTokens({ username: req.body.username, password: req.body.password })
    req.session.regenerate(function (err) {
        if (err) next(err)
        req.session.user = req.body.user
        req.session.save(function (err) {
            if (err) return next(err)
            res.status(200).json(req.session.user +" est le token est "+token)
        })
    })
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
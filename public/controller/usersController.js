const jwt = require('jsonwebtoken');
const users = require('../model/usersModel');
const { json } = require('express');
const getAll = (req, res) => {
    res.status(200).json(posts)
}


function generateTokens(username) {
    return jwt.sign(username, process.env.TOKEN_SECRET_KEY, { expiresIn: '1800s' });
}

const connexion = (req, res) => {
    const token = generateTokens({ username: req.body.username, password: req.body.password });
    res.json(token);
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

module.exports = { generateTokens, connexion, authenticateToken, getAll }
const express = require('express');
const { append } = require('express/lib/response');
const { Post, Comment, User } = require('../models');
const router = express.Router();

router.get('/login', (req, res) => {
    res.render('login')
})

router.get('/register', (req, res) => {
    res.render('register')
})


module.exports = router;
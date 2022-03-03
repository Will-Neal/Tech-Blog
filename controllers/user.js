const express = require('express');
const { append } = require('express/lib/response');
const { Post, Comment, User } = require('../models');
const router = express.Router();
const bcrypt = require('bcrypt')

router.get('/login', (req, res) => {
    res.render('login')
})

router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/login', (req, res) => {

})

router.post('/register', async (req, res) => {
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword 
        }) 
        res.redirect('/user/login')
    } catch {
        res.redirect('/user/register')
    }
})

module.exports = router;
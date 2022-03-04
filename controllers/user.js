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

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                email:req.body.email,
            },
        });
        if (!user) {
            res.render('invalid-user');
            return;
        }

        const validPassword = user.checkPassword(req.body.password);

        if (!validPassword) {
            res.render("invalid-password")
            // res.status(400).json({ message: 'No user account found!'});
            return
        }

        req.session.save(() => {
            req.session.userId = user.id;
            req.session.username = user.name;
            req.session.loggedIn = true;
            
            res.redirect('/');
            
        });
    } catch (err) {
        res.render('login-error')
    }
});

router.post('/register', async (req, res) => {
    try{
        // const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password 
        });
        
        req.session.save(() => {
            req.session.userId = newUser.id;
            req.session.username = newUser.name;
            req.session.loggedIn = true;
            //res.json(newUser);
        })
        
        res.redirect('/login')
    } catch(err) {
        res.render('register-error')
    }
})

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.render('logout');
        });
    } else {
        res.status(404).end
    }
})

module.exports = router;
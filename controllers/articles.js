const express = require('express');
const { Post } = require('../models');
const router = express.Router();

router.get('/new', (req, res) => {
    res.render('new') 
})

router.post('/', async (req, res) => {
    const newPost = new Post({
        title: req.body.title,
        subject: req.body,
        
    })
})

module.exports = router
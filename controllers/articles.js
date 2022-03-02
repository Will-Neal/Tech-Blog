const express = require('express');
const { Post } = require('../models');
const router = express.Router();

router.get('/new', (req, res) => {
    res.render('new') 
})

router.post('/new', (req, res) => {
    console.log(req.body)
    Post.create({
        title: req.body.title,
        subject: req.body.subject,
        content: req.body.content
    })
      .then((newPost) => {
          res.redirect('/')
      })
      .catch((err) => {
          res.redirect('/')
      })
})

module.exports = router
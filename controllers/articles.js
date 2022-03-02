const express = require('express');
const { Post, Comment } = require('../models');
const router = express.Router();

router.get('/new', (req, res) => {
    res.render('new') 
})

router.get('/:id', async (req, res) => {
    id = req.params.id
    try{
       const singlePost = await Post.findOne({
           where: { id }
       }) 
       const cleanPost = singlePost.get({ plain:true })
       const commentsObj = await Comment.findAll({
           where: {post_id:id},
           order: [["id", "DESC"]]
       })
       const comments = commentsObj.map((comment) => comment.get({ plain:true }))
       //Need to figure out why they are showing up as
       res.render('single', {cleanPost, comments}) 
    } catch(err) {
        console.log(err)
    }
    
})

router.post('/new', (req, res) => {
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

router.post('/comment/:id', (req, res) => {
    Comment.create({
        comment: req.body.comment,
        post_id: req.params.id
    })
    .then((newComment) => {
        console.log(newComment);
        res.redirect(`/articles/${req.params.id}`)
        
    })
})

router.delete('/:id', async (req, res) => {
    await Post.destroy({
        where: { id:req.params.id }
    });
    res.redirect('/')
})

module.exports = router
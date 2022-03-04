const express = require('express');
const { Post, Comment, User } = require('../models');
const router = express.Router();

router.get('/new', (req, res) => {
    res.render('new') 
})

router.get('/edit/:id', async (req, res) => {
    try{
    const postObj = await Post.findOne({
        where: { id:req.params.id }
    });
    const post = postObj.get({ plain:true })
    res.render('update', {post})
    } catch(err) {
        console.log(err)
    }
});

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
       console.log(comments)
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
        res.redirect(`/articles/${req.params.id}`)
        
    })
});

router.put('/:id', (req, res) => {
    Post.update({
        title: req.body.title,
        subject: req.body.subject,
        content: req.body.content
    },{
        where: {
            id: req.params.id
        }
    })
    .then((updatedPost) => {
        res.redirect('/')
    })
})

router.delete('/:id', async (req, res) => {
    await Post.destroy({
        where: { id:req.params.id }
    });
    res.redirect('/')
})

module.exports = router
const express = require('express');
const { Post, Comment, User } = require('../models');
const withAuth = require('../utils/auth');
const router = express.Router();

router.get('/new', (req, res) => {
    res.render('new') 
})

router.get('/edit/:id', withAuth, async (req, res) => {
    try{
    const postObj = await Post.findOne({
        where: { id:req.params.id }
    });
    const post = postObj.get({ plain:true })
    // const post = postObj.map((post) => post.get({ plain:true }))
    res.render('update', {post})
    } catch(err) {
        console.log(err)
    }
});

router.get('/:id', async (req, res) => {
    id = req.params.id
    try{
       const singlePost = await Post.findOne({
           where: { id },
           include: [{ model: User}]
       }) 
       const cleanPost = singlePost.get({ plain:true })
       const commentsObj = await Comment.findAll({
           where: {post_id:id},
           order: [["id", "DESC"]],
           include: [{ model: User }]
       })
       const comments = commentsObj.map((comment) => comment.get({ plain:true }))
       //Need to figure out why they are showing up as
       res.render('single', {cleanPost, comments}) 
    } catch(err) {
        console.log(err)
    }
    
})

router.post('/new', withAuth, (req, res) => {
    Post.create({
        title: req.body.title,
        subject: req.body.subject,
        content: req.body.content,
        user_id: req.session.userId
    })
      .then((newPost) => {
          res.redirect('/')
      })
      .catch((err) => {
          res.redirect('/')
      })
})

router.post('/comment/:id', withAuth, (req, res) => {
    Comment.create({
        comment: req.body.comment,
        post_id: req.params.id,
        user_id: req.session.userId
    })
    .then((newComment) => {
        res.redirect(`/articles/${req.params.id}`)
        
    })
});

router.put('/:id', withAuth, (req, res) => {
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

router.delete('/:id', withAuth, async (req, res) => {
    await Post.destroy({
        where: { id:req.params.id }
    });
    res.redirect('/')
})

module.exports = router
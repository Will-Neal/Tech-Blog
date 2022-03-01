const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    articles = 
        {title: "Why QAnon is only for Mensa Level Geniuses", 
        subject: "A flat earther's take on Earth's 6000 year history", 
        date: "Current Date",
        content: "Really if you think about it, given the flatness of the world I see and the fact that I cannot count above 6,000, is it possible that the world could be any different from my perception? As I imagine it, it would be impossible for anybody to have a different perspective than me or to draw a different conclusion based on what I see with my eyes so it is only fair to conclude that anyone who does so is an absolute idiot. If everyone else is idiotic, they must be allergic to the truth and the world at large seems to be generally allergic to QAnon ergo it must be the truth" 
    }
    res.render('index', articles) 
})


module.exports = router
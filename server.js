const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const articleRouter = require('./controllers/articles')

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require('./config/connection');

const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/articles', articleRouter)

app.get('/', (req, res) => {
    articles = 
        [{title: "Why QAnon is only for Mensa Level Geniuses", 
        subject: "A flat earther's take on Earth's 6000 year history", 
        date: "Current Date",
        content: "Really if you think about it, given the flatness of the world I see and the fact that I cannot count above 6,000, is it possible that the world could be any different from my perception? As I imagine it, it would be impossible for anybody to have a different perspective than me or to draw a different conclusion based on what I see with my eyes so it is only fair to conclude that anyone who does so is an absolute idiot. If everyone else is idiotic, they must be allergic to the truth and the world at large seems to be generally allergic to QAnon ergo it must be the truth" 
    },{title: "A treatise on the socioeconomic impact of penguins", 
    subject: "Nature's Supervillains", 
    date: "Yesterday",
    content: "Have you ever stopped to wonder about the truly nefarious nature of penguins?? This obvious but overlooked fact seems to escape the vast majority of humans. For one, if penguins were not nefarious then why would they be born with a natural tuxedo like some sort of flightless bond supervillain with a penchant for fish."

    }]
    res.render('index', {articles})  
})



app.listen(PORT, () => console.log(`Now listening at http://localhost:${PORT}`));

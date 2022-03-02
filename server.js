const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const articleRouter = require('./controllers/articles')
const sequelize = require('./config/connection');
const { Post } = require('./models');


const app = express();
const PORT = process.env.PORT || 3001;



const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/articles', articleRouter)

app.get('/', async (req, res) => {
        articleMess = await Post.findAll({order: [["id", "DESC"]]});
        articles = articleMess.map((article) => article.get({ plain:true }))
        res.render('index', {articles}) 
})


sequelize.sync({ force:false }).then(()=> {
    app.listen(PORT, () => console.log(`Now listening at http://localhost:${PORT}`));
});


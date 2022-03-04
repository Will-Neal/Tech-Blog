const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const articleRouter = require('./controllers/articles')
const userRouter = require('./controllers/user')
const helpers = require('./utils/helpers')

const { Post, User } = require('./models');
const methodOverride = require('method-override')
const session = require('express-session')


const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store)

const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitiated: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));

const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'))

app.use('/user', userRouter)
app.use('/articles', articleRouter)


app.get('/', async (req, res) => {
        articleMess = await Post.findAll({
            order: [["id", "DESC"]],
            include: [{ model: User }],
        });
        articles = articleMess.map((article) => article.get({ plain:true }))
        loggedIn = req.session.loggedIn
        username = req.session.username
        res.render('index', {articles, loggedIn, username}) 
})

sequelize.sync({ force:false }).then(()=> {
    app.listen(PORT, () => console.log(`Now listening at http://localhost:${PORT}`));
});


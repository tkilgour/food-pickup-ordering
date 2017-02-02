'use strict';

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || 'development';
const express     = require('express');
const bodyParser  = require('body-parser');
const session     = require('express-session')
const sass        = require('node-sass-middleware');
const bcrypt      = require('bcrypt');
const app         = express();
const knexConfig  = require('../knexfile');
const knex        = require('knex')(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');
const handlebars  = require('handlebars');  // used for templating
// Seperated Routes for each Resource
const usersRoutes = require('../routes/users');
// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set('view engine', 'ejs');
// Andrew - Cookie session settings to keep track of userID.
app.use(session({
  cookie: { maxAge: 60000 },
  secret: 'andrew_thomas_par_supa_secret',
  resave: false,
  saveUninitialized: false
}))
app.use(bodyParser.urlencoded({ extended: true }));
<<<<<<< HEAD
app.use('/styles', sass({
  src: __dirname + '/../styles',
  dest: __dirname + '/../public/styles',
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static('public'));
// Andrew - URL will be prepended with /user
app.use('/user', usersRoutes(knex));
// Andrew - If no cookie user will have to login/register. If user logged in, redirect to
// menu page to begin order. If restaurant logged in, redirect to admin page.
app.get('/', (req, res) => {
  if (!req.session.user_id || !req.session.restaurant_id) {
    res.status(200).render('index')
  } else if (req.session.user_id && !req.sesssion.restaurant_id) {
    res.redirect('/user/menu')
  } else {
    res.redirect('/admin')
  }
});
// Andrew - logout will destroy cookie session
app.post('/logout', (req, res) => {
  req.session = null
  res.redirect('/login')
});

app.get('/login', (req, res) => {
  res.render('login')
});
// If user login credentials valid, redirect to menu page to create order.
// If login credentials invalid or login fails, redirect to homepage
app.post('/login', (req, res) => {
  const email = req.body.email
  const password = req.body.password
  let user_id = ""
  if (user && (bcrypt.compareSync(password, user.password) || user.password === password)) {
    user_id = user.id
    req.session.user_id = user_id
    res.redirect('/user/menu')
  } else {
    res.status(401).redirect('/')
  }
});

app.listen(PORT, () => {
  console.log('Example app listening on port ' + PORT);
});

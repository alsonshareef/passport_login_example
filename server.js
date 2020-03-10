if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = express();
const port = 5000;
const path = require('path');
const bcrypt = require('bcrypt');
const flash = require('express-flash');
const session = require('express-session');

const passport = require('passport');
require('./passport-config')(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
);

app.set('view-engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());

const users = [];

app.get('/', (req, res) => {
  res.render('index.ejs', { name: req.user.name });
});

// REGISTER
app.get('/register', (req, res) => {
  res.render('register.ejs');
});

app.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    });
    res.redirect('/login');
  } catch (error) {
    console.log(error);
    res.redirect('/register');
  }
  console.log(users);
});

// LOGIN
app.get('/login', (req, res) => {
  res.render('login.ejs');
});

app.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  })
);

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});

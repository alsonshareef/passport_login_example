const express = require('express');
const app = express();
const path = require('path');
const bcrypt = require('bcrypt');
const port = 5000;

app.set('view-engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: false }));

const users = [];

app.get('/', (req, res) => {
  res.render('index.ejs', { name: 'Alson' });
});

// REGISTER
app.get('/register', (req, res) => {
  res.render('register.ejs');
});

app.post('/register', (req, res) => {});

// LOGIN
app.get('/login', (req, res) => {
  res.render('login.ejs');
});

app.post('/login', (req, res) => {});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});

var createError = require('http-errors');
const express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require("body-parser");
const mongoose = require('mongoose');
const users = require('./routes/users');
const app = express();
const login = require('./routes/login');
const userlist = require('./routes/userlist');


mongoose.connect('mongodb://127.0.0.1', { useNewUrlParser: true, 
  useUnifiedTopology: true, 
  useCreateIndex: true,
  autoIndex: true
});

const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database'))


app.use(express.json());

app.use('/api/users', users); //for user registration {http://localhost:3000/api/users}
app.use('/api/login', login); //for user login {http://localhost:3000/api/login}
app.use('/api/userlist/',userlist); //for get userlist {http://localhost:3000/api/userlist?firstName=methew&skip=1&limit=2&sort=organsization}



//PORT 
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
});

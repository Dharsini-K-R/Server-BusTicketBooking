//important import
require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const morgan = require('morgan');

//middleware import
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const auth = require('./Routes/auth');

const ticket = require('./Routes/ticket');
const bus = require('./Routes/bus');
const location = require('./Routes/location');
const user = require('./Routes/user');
//connect database
mongoose
  .connect(process.env.DATABASEPATH, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  .then(() => {
    console.log('DATABASE CONNECTED');
  });

app.get('/', (req, res) => {
  res.send('hello');
});

//usage of middleware
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/api', auth);
app.use('/api', ticket);
app.use('/api', bus);
app.use('/api', location);
app.use('/api', user);

//port
port = process.env.PORT;
//start the server
app.listen(port, () => {
  console.log('SERVER CONNECTED');
});

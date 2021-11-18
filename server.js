require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const os = require('os');
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const mongoose = require('mongoose');
const port = 8000;

app.use('/api/users', require('./routes/user.route'));

app.get('/api/getUser', (req, res) => res.send({ username: os.userInfo().username }));

if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  app.use(express.static('client/build'));
  // Express serve up index.html file if it doesn't recognize route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

mongoose.connect(`${process.env.DB_URL}`, { useNewUrlParser: true, useUnifiedTopology: true }, () => {console.log('Connected to DB')});

app.listen(process.env.PORT || port, () => {console.log(`Server started on port ${port}`)});

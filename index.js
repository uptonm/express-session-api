const express = require('express');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

require('./models/user');
require('./services/passport');

const app = express();
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    maxDays: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIEKEY]
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());

require('./routes/auth.routes.js')(app);
require('./routes/user.routes')(app);

app.listen(process.env.PORT || 8080, () => {
  console.log(`API listening on http://localhost:${process.env.PORT || 8080}`);
});

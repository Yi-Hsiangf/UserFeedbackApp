const express = require('express'); //use to get access to express library
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');

require('./models/User');
require('./services/passport');


const app = express(); // listen to node, send to route

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 *1000, // 30 day
    keys: [keys.cookieKey]
  })
)

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);


mongoose.connect(keys.mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT);
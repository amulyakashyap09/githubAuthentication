const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
let GithubStrategy = require('passport-github').Strategy;
const port = process.env.PORT || '3000'
const callbackUrl = `http://localhost:${port}/auth/callback`//

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.cookieParser());
app.use(express.session({secret: 'mysecret'}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new GithubStrategy({
  clientID: 'your app client id',
  clientSecret: 'your app client secret',
  callbackURL: callbackUrl
}, function(accessToken, refreshToken, profile, done){
  done(null, {
    accessToken: accessToken,
    profile: profile
  });
}));

passport.serializeUser(function(user, done) {
  // for the time being tou can serialize the user 
  // object {accessToken: accessToken, profile: profile }
  // In the real app you might be storing on the id like user.profile.id 
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  // If you are storing the whole user on session we can just pass to the done method, 
  // But if you are storing the user id you need to query your db and get the user 
  //object and pass to done() 
  done(null, user);
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.get('/auth', passport.authenticate('github'));
app.get('/auth/error', auth.error);
app.get('/auth/callback',
  passport.authenticate('github', {failureRedirect: '/auth/error'}),
  auth.callback
);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

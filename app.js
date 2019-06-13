const models = require('./models');
const routes = require('./routes');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const express = require('express');
const session = require('express-session');
const cons = require('consolidate');
const path = require('path');

const app = express();

app.use(session({
	secret: '2C44-4D44-WppQ38S',
	resave: true,
	saveUninitialized: true
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.engine('html', cons.pug);
app.set('view engine', 'html');

app.use(cookieParser());

// Application-Level Middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(async (req, res, next) => {
	req.context = { models, };
	next();
  });

// Routes
app.use('/', routes.landing);
app.use('/session', routes.session);
app.use('/authors', routes.authors);
app.use('/posts', routes.posts);
app.use('/tags', routes.tags);
app.use('/auth', routes.auth);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;

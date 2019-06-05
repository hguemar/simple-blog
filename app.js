
import models, { connectDb } from './models';
import routes from './routes';

import 'dotenv/config';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import cons from 'consolidate';
import path from 'path';

const app = express();

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
  req.context = {
    models,
	me: await models.Authors.findByLogin('rwieruch'),
  };
  next();
});


// Routes
app.use('/', routes.landing);
app.use('/session', routes.session);
app.use('/authors', routes.authors);
app.use('/posts', routes.posts);
app.use('/tags', routes.tags);

app.use('/bootstrap', routes.bootstrap);

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


// Start
const eraseDatabaseOnSync = true;

connectDb().then(async () => {
  if (eraseDatabaseOnSync) {
    await Promise.all([
      models.Authors.deleteMany({}),
	  models.Posts.deleteMany({}),
	  models.Tags.deleteMany({})
    ]);

    createUsersWithMessages();
  }

});

const createUsersWithMessages = async () => {
  const author1 = new models.Authors({
    username: 'rwieruch',
    email: 'toto@tata.com',
  });

  const author2 = new models.Authors({
    username: 'ddavids',
    email: 'tata@toto.com',
  });
  
  const tag1 = new models.Tags({ tag : 'tag1'});
  const tag2 = new models.Tags({ tag : 'tag2'});
  const tag3 = new models.Tags({ tag : 'tag3'});
  const tag4 = new models.Tags({ tag : 'tag4'});
  const tag5 = new models.Tags({ tag : 'tag5'});
  const tag6 = new models.Tags({ tag : 'tag6'});

  const post1 = new models.Posts({
    title: 'Post 1',
      text: 'Published the Road to learn React',
      author: author1.id,
      tags: [ tag1.id, tag2.id]
	});
	tag1.posts.push(post1.id);
	tag2.posts.push(post1.id);
	author1.posts.push(post1.id);
  
  const post2 = new models.Posts({
  title: 'Post 2',
    text: 'Happy to release ...',
    author: author2.id,
    tags: [ tag1, tag2, ],
  });
  tag1.posts.push(post2.id);
  tag2.posts.push(post2.id);
  author2.posts.push(post2.id);

  const post3 = new models.Posts({
  title: 'Post 3',
    text: 'Published a complete ...',
    author: author2.id,
    tags: [ tag3, ],
  });
  tag3.posts.push(post3.id);
  author2.posts.push(post3.id);

  const post4 = new models.Posts({
    title: 'Post 4',
      text: 'Published the Road to learn React',
      author: author1.id,
      tags: [ tag4, tag5, ],
	});
	tag4.posts.push(post4.id);
	tag5.posts.push(post4.id);
	author1.posts.push(post4.id);
  
    const post5 = new models.Posts({
    title: 'Post 5',
      text: 'Happy to release ...',
      author: author1.id,
      tags: [ tag4, tag5, ],
	});
	tag4.posts.push(post5.id);
	tag5.posts.push(post5.id);
	author1.posts.push(post5.id);
  
    const post6 = new models.Posts({
    title: 'Post 6',
      text: 'Published a complete ...',
	  author: author1.id,
	  tags: [ tag6, ],
	});
	tag6.posts.push(post6.id);
	author1.posts.push(post6.id);

  await post1.save();
  await post2.save();
  await post3.save();
  await post4.save();
  await post5.save();
  await post6.save();

  await tag1.save();
  await tag2.save();
  await tag3.save();
  await tag4.save();
  await tag5.save();
  await tag6.save();

  await author1.save();
  await author2.save();
};

module.exports = app;

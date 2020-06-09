var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const redis = require('redis');
const session = require('express-session');
//construtor passado (Session)
let RedisStore = require('connect-redis')(session);
let client = redis.createClient();

//Upload de arquivo permite varios formatos para passar
var formidable = require('formidable');
var path = require('path');

var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');

var app = express();

app.use(function (req, res, next){
  // Valida se é post a solicitacao se for get cai no else
  if(req.method === 'POST'){

  var form = formidable.IncomingForm({

    //fazer o caminho
    uploadDir: path.join(__dirname, "/public/images"),
    //extensao
    keepExtensions: true
  });

  form.parse(req, function(err, fields, files){
    req.fields = fields;
    req.files = files;

    next();
  });

}else{
   
  next();
}

});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//session via redis teste
app.use(session({
  store: new RedisStore({client}),
  host: 'localhost',
  port: 6379,
  secret: 'p@ssw0rd',
  resave: true,
  saveUninitialized: true
}));

app.use(logger('dev'));

//bodyparser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});



app.listen (8094, () => {
  console.log("Server is running!");
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

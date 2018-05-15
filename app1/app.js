var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyparser = require('body-parser');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var mongoose = require('mongoose');
var cors = require('cors');

//mongoose.Promise = global.Promise;
mongoose.connect('mongodb://react:react@ds121089.mlab.com:21089/react-node');
// mongoose.connect('mongodb://psaana:palu!@123@ds215370.mlab.com:15370/app1');
var db = mongoose.connection;
db.on('error',()=>{console.log("not connected")})
var schema = mongoose.Schema;
var gitSchema = new schema({
  giturl:String,
  branch:String,
  language:String
});
var git = mongoose.model('sample',gitSchema);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.get('/*',function(req,res){
  res.sendFile(__dirname+'/dist/index.html');
});



// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });
app.post('/data',function(req,res){
  console.log("called")
  var obj = new git(req.body);
  obj.save((err,data)=>{
    if(err)
    throw err
    console.log(data);
    res.json({data:data});
  }
)
})


module.exports = app;

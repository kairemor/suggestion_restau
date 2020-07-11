const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors')();
const indexRouter = require('./routes/index');
const suggestionRouter = require('./routes/suggestion');
const repasRouter = require('./routes/repas');
const blousonRouter = require('./routes/blouson');
const url = require('./config/config').mongoUrl;

const app = express();
app.use(cors);
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(db => console.log("connected to  db"))
  .catch(err => console.log(err));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/suggestion', suggestionRouter);
app.use('/repas', repasRouter);
app.use('/blouson', blousonRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;

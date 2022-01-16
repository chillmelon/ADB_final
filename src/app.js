var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var swaggerJsdoc = require("swagger-jsdoc");
var swaggerUI = require("swagger-ui-express");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouter = require('./api');

var app = express();

const doc_options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Holy real estate API",
			version: "1.0.0",
			description: "An api to help you find your holy house",
		},
		servers: [
			{
				url: "http://localhost:3000",
			},
		],
	},
	apis: ["./openapi.yml"],
};

const swaggerSpec = swaggerJsdoc(doc_options);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
apiRouter(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;

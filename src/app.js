const express = require('express');
const app = express();
const cors = require('cors')
const favicon = require('express-favicon');
const logger = require('morgan');
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('../swagger-output.json')

const mainRouter = require('./routes/mainRouter.js');
const authRouter = require('./routes/auth')

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(express.static('public'))
app.use(favicon(__dirname + '/public/favicon.ico'));

// routes
app.use('/api/v1', mainRouter);
app.use('/api/v1/auth', authRouter)

module.exports = app;
const express = require('express');
const app = express();
const cors = require('cors')
const favicon = require('express-favicon');
const logger = require('morgan');
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('../swagger-output.json')

const mainRouter = require('./routes/mainRouter.js');
const authRouter = require('./routes/auth')

const ordersRouter = require('./routes/order')
const paymentsRouter = require('./routes/payment')
const productsRouter = require('./routes/product')
const changePassRouter = require('./routes/changePass')
const getUsersRouter = require('./routes/getUsers.js')
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(express.static('public'))
app.use(favicon(__dirname + '/public/favicon.ico'));

const authenticateUser = require('../src/middleware/authentication');

// routes
app.use('/api/v1', mainRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/orders', authenticateUser, ordersRouter);
app.use('/api/v1/payments', authenticateUser, paymentsRouter);
app.use('/api/v1/products', productsRouter);
app.use('/api/v1/getUsers', getUsersRouter);
app.use('/api/v1/changePass', authenticateUser, changePassRouter);



module.exports = app;
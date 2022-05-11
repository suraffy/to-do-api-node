const express = require('express');
const user = require('./routers/userRouter');

const app = express();

app.use(express.json());

app.use('/users', user);

module.exports = app;

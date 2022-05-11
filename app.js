const express = require('express');
const user = require('./routers/userRouter');
const task = require('./routers/taskRouter');

const app = express();

app.use(express.json());

app.use('/users', user);
app.use('/tasks', task);

module.exports = app;

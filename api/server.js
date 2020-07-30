const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authenticate = require('../auth/auth-middleware.js');
const authRouter = require('../auth/auth-router.js');
const listRouter = require('../todo/list-router.js');
const todoRouter = require('../todo/todo-router')
const userRouter = require('../users/userdata-router')

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/', authRouter);
server.use('/api/lists', authenticate, listRouter);
server.use('/api/todo', authenticate, todoRouter);
server.use('/api/users', authenticate, userRouter);

server.get('/', (req, res) => {
    res.send(`<h2>Welcome to the Wunderlist 2.0 backend!</h2>`);
  });

server.get('/api', (req, res) => {
  res.status(200).json({message: "Welcome to Wunderlist 2.0!", name: 'Wunderlist 2.0'})
})

module.exports = server;

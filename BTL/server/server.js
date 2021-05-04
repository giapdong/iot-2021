const express = require('express')
const socketio = require('socket.io')
const mongoose = require('mongoose')

require('dotenv').config()

// Connect to mongo atlas
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => console.log('Connected to mongo atlas!'))

// initialize server
const app = express()
const server = require('http').Server(app)
const io = socketio(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
})

server.listen(process.env.PORT)
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// middleware
io.of('/').on('connect', (socket) => {
  socket.emit('connect-done', { msg: 'Connected' })
  app.use('/user', [socketMiddleware(socket), require('./routes/user')])
})

// socket
const socketMiddleware = (socket) => (req, res, next) => {
  req.refsocket = socket
  next()
}

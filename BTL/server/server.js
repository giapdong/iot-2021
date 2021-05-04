const mongoose = require('mongoose')
const cors = require('cors')

const express = require('express')
const socketio = require('socket.io')

require('dotenv').config()

// Connect to mongo atlas
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => {
    console.log('Connected to mongo atlas!')
    require('./mqtt-subscriber')
  })

// initialize server
const app = express()
const server = require('http').Server(app)
const io = socketio(server, {
  cors: {
    origin: 'http://host.docker.internal:3000',
    methods: ['GET', 'POST']
  }
})

server.listen(process.env.PORT)
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
app.get('/test', (req, res) => {
  res.send('Hello, test api!')
})

// middleware
io.of('/').on('connect', (socket) => {
  socket.emit('connect-done', { msg: 'Connected' })
  app.use('/user', [socketMiddleware(socket), require('./routes/user')])
})

// socket
const socketMiddleware = (socket) => (req, res, next) => {
  req.refsocket = socket
  req.refio = io
  next()
}

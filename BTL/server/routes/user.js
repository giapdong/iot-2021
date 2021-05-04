const express = require('express')
const User = require('../models/User')
const router = express.Router()

const genPosition = () => {
  const MAX = 1000
  const num1 = Math.random()
  const num2 = Math.random()
  const num3 = Math.random()
  const num4 = Math.random()
  const num = num1 * 10000 + num2 + 1000 + num3 * 100 + num4 * 10
  return num % MAX
}

function genName() {
  return 'z' + Math.random().toString(36).substr(2, 9)
}

router.post('/in', async (req, res) => {
  const socket = req.refsocket

  const { number, type, time } = req.body
  const user = {
    name: genName(),
    position: genPosition(),
    car: { plate: number, carType: 'car' },
    sessions: { checkIn: time }
  }

  try {
    const newUser = await User.create(user)
    socket.broadcast.emit('dataFromServer', { data: newUser, time: time, type: 'in' })
    res.status(200).json(newUser)
  } catch (error) {
    res.status(404).json(error)
  }
})

router.post('/info', async (req, res) => {
  const { number, type, time } = req.body
  try {
    const user = await User.findOne({ 'car.plate': number }).exec()
    const socket = req.refsocket

    try {
      if (type === 'in') {
        console.log('def')
        if (user.car.sessions.length === 0 || user.car.sessions[user.car.sessions.length - 1].checkOut) {
          console.log('1')
          user.car.sessions.push({
            checkIn: time
          })
          const userCheckIn = await user.save()
          console.log('userCheckin')
          socket.broadcast.emit('dataFromServer', { data: userCheckIn, time: time, type: 'in' })
          res.status(202).json(userCheckIn)
        } else if (user.car.sessions.length > 0 && user.car.sessions[user.car.sessions.length - 1].checkIn) {
          user.car.sessions[user.car.sessions.length - 1].checkIn = time
          const userCheckIn = await user.save()
          console.log('userCheckin')
          socket.broadcast.emit('dataFromServer', { data: userCheckIn, time: time, type: 'in' })
          res.status(202).json(userCheckIn)
        } else {
          console.log('2')
          socket.broadcast.emit('checkInFail', { error: 'Chưa check out' })
          res.status(404).json({ err: 'Check in fail ' })
        }
      }

      if (type === 'out') {
        if (user.sessions && user.sessions.checkIn) {
          user.sessions.checkOut = time
          const userCheckDone = await user.save()
          socket.broadcast.emit('dataFromServer', { data: userCheckDone, time: time, type: 'out' })
          res.status(202).json(userCheckDone)
        } else {
          console.log('4')
          socket.broadcast.emit('checkInFail', { error: 'Chưa check in' })
          res.status(404).json({ err: 'Check out fail ' })
        }
      }
    } catch (error) {
      console.log(error)
      res.status(404).json(error)
    }
  } catch (error) {
    socket.broadcast.emit('checkInFail', { error: 'Not found car' })
    res.json({ err: 'Not found' })
  }
})

module.exports = router

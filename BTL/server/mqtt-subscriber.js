const mqtt = require('mqtt')
const User = require('./models/User')

// const HOST = 'broker.hivemq.com'
const HOST = 'host.docker.internal'
const TOPIC = ['iot20202/parking-01', 'iot20202/parking-02']
const client = mqtt.connect(`mqtt://${HOST}:1883`)

client.on('connect', function () {
  client.subscribe(TOPIC, function (err) {
    if (err) {
      console.log('Subscriber MQTT Broker failed.')
      console.error(err)
    } else {
      console.log('Subscribed MQTT Broker!')
    }
  })
})

client.on('message', async function (topic, message) {
  // jsonMessage structure
  // number   : plate number of car
  // type     : 'in' or 'out'
  // base64   : base64 of car
  // time     : time in/out
  // parking  : name of parking
  const jsonMessage = JSON.parse(message.toString())
  jsonMessage.parking = topic
  const userInDB = await User.findOne({ 'car.plate': jsonMessage.number }).exec()

  if (!userInDB) {
    // First goto IN
    console.log(`${jsonMessage.parking} - Car ${jsonMessage.number} first IN`)
    handFirstIn(jsonMessage)
  } else if (jsonMessage.type == 'in') {
    // Handle car IN
    console.log(`${jsonMessage.parking} - Car ${jsonMessage.number} IN`)
    handleCarIn(userInDB, jsonMessage)
  } else if (jsonMessage.type == 'out') {
    // Handle car OUT
    console.log(`${jsonMessage.parking} - Car ${jsonMessage.number} OUT`)
    handleCarOut(userInDB, jsonMessage)
  }
})

async function handleCarOut(userInDB, jsonMessage) {
  if (!userInDB.history) userInDB.history = []

  userInDB.sessions.checkOut = {
    time: jsonMessage.time,
    image: jsonMessage.base64
  }

  userInDB.history.push(userInDB.sessions)
  userInDB.sessions = null

  await userInDB.save()
}

async function handleCarIn(userInDB, jsonMessage) {
  userInDB.sessions = {
    parking: jsonMessage.parking,
    position: genPosition(),
    checkIn: {
      time: jsonMessage.time,
      image: jsonMessage.base64
    }
  }

  await userInDB.save()
}

async function handFirstIn(jsonMessage) {
  const user = {
    name: genName(),
    car: { plate: jsonMessage.number, carType: 'car' },
    history: [],
    sessions: {
      parking: jsonMessage.parking,
      position: genPosition(),
      checkIn: {
        time: jsonMessage.time,
        image: jsonMessage.base64
      }
    }
  }

  return await User.create(user)
}

function genPosition() {
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

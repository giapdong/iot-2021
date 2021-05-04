const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String
    },
    car: {
      plate: {
        type: String,
        unique: true
      },
      carType: {
        type: String
      }
    },
    history: [
      {
        parking: {
          type: String
        },
        position: {
          type: String
        },
        checkIn: {
          time: {
            type: Date
          },
          image: {
            type: String
          }
        },
        checkOut: {
          time: {
            type: Date
          },
          image: {
            type: String
          }
        }
      }
    ],
    sessions: {
      parking: {
        type: String
      },
      position: {
        type: String
      },
      checkIn: {
        time: {
          type: Date
        },
        image: {
          type: String
        }
      },
      checkOut: {
        time: {
          type: Date
        },
        image: {
          type: String
        }
      }
    }
  },
  { autoIndex: false }
)

const User = mongoose.model('users', userSchema)

module.exports = User

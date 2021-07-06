<template>
  <div id="app">
    <div class="parking-selector">
      <div class="parking-selector-wrapper">
        <select name="parking-selector" id="parking-selector" v-model="parking" style="padding: 4px;">
          <option value="parking-01" selected>Parking 01</option>
          <option value="parking-02">Parking 02</option>
        </select>
      </div>
    </div>

    <div class="car-info">
      <div class="car-info-wrapper">
        <div class="car-number">
          Plate number: <span>{{ plateNumberOut }}</span>
        </div>
        <div class="car-time">
          Time out: <span>{{ timeOut }}</span>
        </div>
      </div>

      <div class="car-info-wrapper">
        <div class="car-number">
          Plate number: <span>{{ plateNumberIn }}</span>
        </div>
        <div class="car-time">
          Time in: <span>{{ timeIn }}</span>
        </div>
      </div>
    </div>

    <div class="car-preview">
      <div class="img-car-wrapper">
        <img class="img-car" id="img-car-out" alt="Car out" :src="imageOut" />
      </div>

      <div class="img-car-wrapper">
        <img class="img-car" id="img-car-in" alt="Car in" :src="imageIn" />
      </div>
    </div>
  </div>
</template>

<script>
import { io } from 'socket.io-client'

export default {
  name: 'App',
  components: {},
  data() {
    return {
      imageIn: 'https://media.zenobuilder.com/asset/logo.png',
      imageOut: 'https://media.zenobuilder.com/asset/logo.png',

      plateNumberIn: null,
      plateNumberOut: null,

      timeIn: null,
      timeOut: null,

      parking: 'parking-01'
    }
  },
  watch: {
    parking() {
      this.resetData()
    }
  },
  created() {
    const socket = io('http://localhost:9000')

    socket.on('connect', () => {
      console.log('socket id: ', socket.id)
    })

    socket.on('connect-done', () => {
      console.log('connect done')
    })

    socket.on('dataFromServer', data => {
      // const {base64, number, parking, time, type} = data
      if (`iot20202/${this.parking}` != data.parking) return

      if (data.type == 'out') {
        this.imageOut = 'data:image/gif;base64,' + data.base64
        this.plateNumberOut = data.number
        this.timeOut = this.parseTimeFormat(data.time)
      } else {
        this.imageIn = 'data:image/gif;base64,' + data.base64
        this.plateNumberIn = data.number
        this.timeIn = this.parseTimeFormat(data.time)
      }
    })

    console.log('created')
  },
  methods: {
    parseTimeFormat(time) {
      const date = new Date(+time)
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDay()

      const hour = date.getHours()
      const minute = date.getMinutes()
      const seconds = date.getSeconds()

      return `${day}/${month}/${year} ${hour}:${minute}:${seconds}`
    },
    resetData() {
      this.imageIn = 'https://media.zenobuilder.com/asset/logo.png'
      this.imageOut = 'https://media.zenobuilder.com/asset/logo.png'

      this.plateNumberIn = null
      this.plateNumberOut = null

      this.timeIn = null
      this.timeOut = null
    }
  }
}
</script>

<style>
html,
body {
  height: 100%;
  margin: 0;
}

* {
  box-sizing: border-box;
}
</style>

<style lang="less" scoped>
@primary: gray;

#app {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.parking-selector {
  height: 10%;
  width: 100%;
  padding: 12px;

  .parking-selector-wrapper {
    height: 100%;
  }
}

.car-info {
  height: 20%;
  width: 100%;
  display: flex;

  .car-info-wrapper {
    @blur-primary: rgba(@primary, 0.25);
    flex: 1 1 50%;
    margin: 0 12px;
    height: 100%;
    box-shadow: 2px 2px 5px @blur-primary, -2px -2px 5px @blur-primary;
    border: 1px solid @blur-primary;
    border-radius: 5px;
    padding-left: 12px;

    .car-number {
      span {
        font-size: 20px;
        font-weight: bold;
      }
    }
  }
}

.car-preview {
  display: flex;
  height: 80%;
  width: 100%;

  .img-car-wrapper {
    flex: 1 1 50%;
    padding: 12px;

    img {
      @blur-primary: rgba(@primary, 0.25);

      box-shadow: 2px 2px 5px @blur-primary, -2px -2px 5px @blur-primary;
      border: 1px solid @blur-primary;
      border-radius: 5px;
      width: 100%;
      height: 100%;
    }
  }
}
</style>

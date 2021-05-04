const INFO_CAR = 'car_info'

const StorageService = {
  getCarInfo() {
    const data = localStorage.getItem(INFO_CAR)
    return JSON.parse(data)
  },
  saveCarInfo(info) {
    const data = JSON.stringify(info)
    localStorage.setItem(INFO_CAR, data)
  },
  removeCarInfo() {
    localStorage.removeItem(INFO_CAR)
  }
}

export { StorageService }

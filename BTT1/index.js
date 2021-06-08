const axios = require('axios').default;
const body = {
    "deviceId": "8a0fc66a61a959f6",
    "qrCodeId": "a652d57094b7590b0dea115b156c07098abdea87",
    "qrCodeValue": "P22498244182551944"
}

axios.post('https://postman-echo.com/post?id=10', body)
  .then(function (response) {
    // handle success
    console.log('success', response.data);
  })
  .catch(function (error) {
    // handle error
    console.log('failed', error);
  })

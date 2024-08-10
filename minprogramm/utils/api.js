const BASE_URL = 'https://devapi.qweather.com/v7/'
const KEY = '45522446a742466eb7bef92da2c92f8e'

const request = (url, method, data) => {
  data.key = KEY
  return new Promise((resolve, reject) => {
    wx.request({
      method,
      url,
      data,
      success(res) {
        resolve(res.data)
      },
      fail(error) {
        reject(error)
      }
    })
  })
}

module.exports = {
  // 当前位置天气
  nowWeather: (data) => {
    return request(`${BASE_URL}weather/now`, 'get', data)
  },
  sevenDayWeather: (data) => {
    return request(`${BASE_URL}weather/7d`, 'get', data)
  }
}
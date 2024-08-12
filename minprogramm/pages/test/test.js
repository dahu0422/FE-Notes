// pages/user/test.js

const API = require('../../utils/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitude: null,
    latitude: null,
    markers: null,
    sevenDayWeathers: [], // 近7天天气
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log('页面加载---onLoad')
    const that = this
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        console.log(res)
        const {latitude, longitude} = res
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          markers: [{
            id: 0,
            latitude: res.latitude,
            longitude: res.longitude,
            iconPath: '/static/images/location.png',
            width: 40,
            height: 40
          }]
        })
        API.nowWeather({ location: `${longitude},${latitude}` }).then(res => {
          console.log(res)
        }),
        API.sevenDayWeather({ location: `${longitude},${latitude}` }).then(res => {
          console.log(res);
          that.setData({
            sevenDayWeathers: res.daily
          })
          console.log(that.data.sevenDayWeathers)
        })
      }
    })


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    console.log('页面准备完成---onReady')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    console.log('页面展示---onShow')
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
    console.log('页面隐藏---onHide')
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    console.log('页面卸载---onUpload')
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  goIndex() {
    wx.reLaunch({
      url: '/pages/index/index',
    })
  },

  goCamera() {
    wx.navigateTo({
      url: '/pages/camera/camera',
    })
  }
})
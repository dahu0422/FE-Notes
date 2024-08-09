// app.js
App({
  onLaunch() {
    console.log('小程序初始化---onLaunch')
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        console.log('登录', res)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })

    // 查看是否有授权
    wx.getSetting({
      success(res) {
        if(res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success(res) {
              console.log(res.userInfo)
            }
          })
        } else {
          console.log('未授权')
        }
      }
    })
  },
  onShow() {
    console.log('监听小程序切前台---onShow')
  },
  onHide() {
    console.log('监听小程序切后台---onHide')
  },
  globalData: {
    userInfo: null
  }
})

//app.js
App({
  code:'',
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var that =this;
    // 登录
    wx.login({
      
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        // console.log(res)
        var code = res.code;
        this.code = res.code;
        wx.getUserInfo({
          success: function (res) {
            // console.log(res);
            var encryptedData = res.encryptedData;
            var iv = res.iv;
            console.log(iv)
            console.log(code)
            console.log(encryptedData)
            wx.request({
              url: 'https://nearby-service-api.mj115.com/account/login',
              method: 'POST',
              data: {
                code:code,
                iv:iv,
                encrypted_data: encryptedData
              },
              header: {
                'content-type': 'application/json'
              },
              success: function (res) {
                  console.log(res)
              }
            })
          }
        })
      }
    })

    
    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     console.log(res)
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
  },
  globalData: {
    userInfo: null
  },

  APIURL:'https://nearby-service-api.mj115.com/'
})
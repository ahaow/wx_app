//app.js
App({
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    wx.setStorage({
      key: 'skin',
      data: 'normal-skin',
    })

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  
  setSkin: (that) => {
    wx.getStorage({
      key: 'skin',
      success: (res) => {
        console.log(res);
        if (res) {
          that.setData({
            skin: res.data
          })
          // 动态设置 NavigationBar 和 TabBar 颜色样式
          var NavigationBarColor = res.data == 'dark-skin' ? '#ffffff' : '#000000', // 设置 NavigationBar 的 文字颜色
            obj = {
              'normal-skin': {
                color: '#000000',
                background: '#ffffff'
              },
              'dark-skin': {
                color: '#ffffff',
                background: '#000000'
              },
              'red-skin': {
                color: '#8e5a54',
                background: '#f9e5ee'
              },
              'yellow-skin': {
                color: '#8c6031',
                background: '#f6e1c9'
              },
            },
            item = obj[res.data],
            tcolor = item.color,
            bcolor = item.background;

          wx.setNavigationBarColor({
            frontColor: NavigationBarColor,
            backgroundColor: bcolor,
          })

          wx.setTabBarStyle({
            color: tcolor,
            backgroundColor: bcolor,
          })


        }

      },
    })
  },

  globalData: {
    userInfo: null,
    skin: 'normal'
  }
})
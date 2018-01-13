//index.js
//获取应用实例
const app = getApp();
var QQMapWX = require('../../libs/qqmap-wx-jssdk.min.js');
var qqmapsdk;
Page({
  data: {
    imgUrls: [
      '../../image/banner01.png'
      // 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      // 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    circular: true,
    interval: 5000,
    duration: 1000,
    middelTxt: '附近家政：基于用户位置10分钟附近家政快速反馈',

    classify:''
  },

  // //用户登录
  login: function () {
    var that = this;
    var code, iv, encryptedData;
    wx.login({
      success: function (res) {
        code = res.code

        //获取用户信息
        wx.getUserInfo({
          success: function (res) {

            iv = res.iv;
            encryptedData = res.encryptedData;
            console.log(encryptedData);
            console.log(iv);
            console.log(code);
          }
        })


      }
    });

  },

  //跳转
  fnOpenWin: function (e) {
    // wx.navigateTo({
    //   url: '../classify/classify'
    // })

    var id = e.currentTarget.dataset.id
    console.log(id)

    wx.navigateTo({
      url: '../classify/classify?id'
    })
  },

  //页面加载
  onLoad: function (options) {
    this.getBanner();
    this.getClassify();
  },

  //获取banner图
  getBanner: function () {
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.APIURL + 'banner',
      method: 'POST',
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        // console.log(res.data)
        
        var imgUrl = [];
        res.data.results.forEach(function (item) {
          imgUrl.push(item.image);
        })
        that.setData({
          imgUrls: imgUrl
        })
        wx.hideLoading();
      }
    })
  },


  //获取分类
  getClassify:function(){
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    wx.request({
      url: app.APIURL + 'category',
      method: 'POST',
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var imgUrl = [];
        if (res.data.status=="success"){
          that.setData({
            classify: res.data.results
          })
        }
        wx.hideLoading();
      }
    })
  }
})
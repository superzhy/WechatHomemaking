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

  // 获取定位
  location: function () {
    var that = this;
    //实例化API核心类
    qqmapsdk = new QQMapWX({
      key: 'RYDBZ-I5Q6G-3T4QL-IB3WB-YS5FT-YUFRI'
    });

    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        // console.log(res.latitude);
        // console.log(res.longitude);


        //根据坐标逆解析地址
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function (res) {
            // console.log(res);
            var address = res.result.address;
            that.address = address;
            console.log(address);
          },
          fail: function (res) {
            console.log(res);
          }
        });


      }
    })
  },

  //用户登录
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
    console.log(app.banner);
    this.getBanner();
    this.getClassify();
  },

  //获取banner图
  getBanner: function () {
    var that = this;
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
      }
    })
  },


  //获取分类
  getClassify:function(){
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
      }
    })
  }
})
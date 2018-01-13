// pages/yuyue/yuyue.js
var util = require('../../utils/util.js');  
var QQMapWX = require('../../libs/qqmap-wx-jssdk.min.js');
var qqmapsdk;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:'',
    date:'2018-01-01',
    maxdate:'',
    time: '12:01',
    id:'',
    money:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    // console.log(1)
    // this.seteData({
    //   id:''
    // });
    this.setData({
      id:options.id,
      money: options.money
    })
    
    this.getAddress();

    var date = util.formatTime(new Date());
    this.setData({
      date: date.date
    });
    this.setData({
      maxdate: date.maxdate
    });
    this.setData({
      time: date.time
    }); 
    // console.log(date);
  },

  //获取当前地址
  getAddress:function(){
    var that = this;
    
    //实例化API核心类
    qqmapsdk = new QQMapWX({
      key: 'RYDBZ-I5Q6G-3T4QL-IB3WB-YS5FT-YUFRI'
    });

    //获取定位
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        //根据坐标逆解析地址
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function (res) {
            // console.log(res);
            var address = res.result.address;
            // that.address = address;
            that.setData({

              address: address

            })
            console.log(address);
          },
          fail: function (res) {
            console.log(res);
          }
        });
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },



  //立即预约
  submit:function(){
    var openid = olocm0SqbMmK12A1AcHed3eMqlMA;
  }
})
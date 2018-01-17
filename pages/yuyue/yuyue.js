// pages/yuyue/yuyue.js
const app = getApp();
var util = require('../../utils/util.js');
var QQMapWX = require('../../libs/qqmap-wx-jssdk.min.js');
var Md5 = require('../../utils/md5.js');
var qqmapsdk;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: '',
    date: '2018-01-01',
    maxdate: '',
    time: '12:01',
    id: '',
    money: '',
    name: '',
    phone: '',
    remarks: '',
    showBtn: false
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
      id: options.id,
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
  getAddress: function () {
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
            console.log(res);
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
  submit: function () {
    var name = this.data.name;
    var phone = this.data.phone;
    var date = this.data.date;
    var time = this.data.time;
    var address = this.data.address;
    var remarks = this.data.remarks;
    var id = this.data.id;

    var book_date = date+' '+time;
    console.log(book_date)
    // console.log(name);
    // console.log(phone);
    // console.log(date);
    // console.log(time);
    // console.log(address);
    // console.log(remarks);

    if (!name || !phone || !address) {
      console.log("填写用户名和手机号")
      wx.showModal({
        title: '提示',
        content: '填写信息完整',
        showCancel: false,
        success: function (res) { }
      })
    } else {
      wx.login({
        success: function (res) {
          console.log(res.code)
          wx.showLoading({
            title: '加载中',
          })
          var that = this;
          wx.request({
            url: app.APIURL + 'order/create',
            method: 'POST',
            data: {
              code: res.code,
              id: id,
              full_name: name,
              phone: phone,
              address: address,
              remarks:remarks,
              book_date: book_date
            },
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              console.log(res)
              wx.hideLoading();
              var nonce_str = res.data.results.nonce_str;
              // var timeStamp = res.data.results.timeStamp;
              var prepay_id = res.data.results.prepay_id;
              var paySign = res.data.results.pay_sign;
              // var nonce_str = res.data.results.nonce_str;
              var timeStamp = String(res.data.results.timeStamp);
              wx.requestPayment(
                {
                  'timeStamp': timeStamp,
                  'nonceStr': nonce_str,
                  'package': 'prepay_id=' + prepay_id,
                  'signType': 'MD5',
                  'paySign': paySign,
                  'success': function (res) {
                    console.log(res);
                  },
                  'fail': function (res) { console.log(res); },
                  'complete': function (res) { console.log(res); }
                })
            }
          })
        }
      });

    }
  },

  selectAddress: function () {
    var that = this;
    wx.chooseAddress({
      success: function (res) {
        that.setData({
          name: res.userName,
          phone: res.telNumber,
          address: res.provinceName + res.cityName + res.countyName + res.detailInfo
        })
      }
    })
  },

  //获取名字
  bindName: function (e) {

    this.setData({
      name: e.detail.value
    })
    console.log(this.data.name)
  },

  //获取电话
  bindPhone: function (e) {
    this.setData({
      phone: e.detail.value
    })
    console.log(this.data.phone)
  },
  //获取地址
  bindAddress: function (e) {
    this.setData({
      address: e.detail.value
    })
    console.log(this.data.address)
  },

  //获取电话
  bindRemarks: function (e) {
    this.setData({
      remarks: e.detail.value
    })
    console.log(this.data.remarks)
  }


})
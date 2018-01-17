// pages/merchantEnter/merchantEnter.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    phone:'',
    showBtn:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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

  getPhone:function(e){
    console.log(e.detail.value)
    this.setData({
      phone: e.detail.value
    })

    var name = this.data.name;
    var phone = this.data.phone;
    if (phone == '' || name == '') {
      this.setData({
        showBtn: false
      })
    } else {
      this.setData({
        showBtn: true
      })
    }
  },
  getName: function (e) {
    console.log(e.detail.value)

    var name=this.data.name;
    var phone=this.data.phone;
    if(phone==''||name==''){
      this.setData({
        showBtn:false
      })
    }else {
      this.setData({
        showBtn: true
      })
    }
    this.setData({
      name: e.detail.value
    })
  },
  submit:function(){
    var name = this.data.name;
    var phone = this.data.phone;
    wx.showLoading({
      title: '加载中',
    })
    wx: wx.request({
      url: app.APIURL + 'check_in',
      data: {
        full_name: name,
        phone: phone
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      success: function (res) {
        console.log(res)
        wx.hideLoading();
      },
      fail: function (res) {
        console.log(res)
      },
      complete: function (res) { },
    })
  }
})
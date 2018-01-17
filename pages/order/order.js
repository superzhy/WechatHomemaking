// pages/order/order.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    results:[],
    page:1,
    loadPage:2
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
      // console.log(app.code);
      this.getData();
  },
  getData:function(){
    var page = this.data.page;
    this.setData({
      loadPage:2
    })
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    wx: wx.login({
      success: function (res) {
        console.log(res);
        wx: wx.request({
          url: app.APIURL + 'order/listing',
          data: {
            code: res.code,
            page: page
          },
          header: {
            'content-type': 'application/json'
          },
          method: 'POST',
          success: function (res) {
            console.log(res.data)
            that.setData({
              results: res.data.results
            })
            wx.hideLoading();
          },
          fail: function (res) {
            console.log(res)
          },
          complete: function (res) { },
        })

      },
      fail:function(){
        wx.showToast({
          title: '服务器错误',
          icon: 'success',
          duration: 2000
        })
      }
    })
  },
  loadMore:function(){
    var page = this.data.loadPage;
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    wx: wx.login({
      success: function (res) {
        console.log(res);
        wx: wx.request({
          url: app.APIURL + 'order/listing',
          data: {
            code: res.code,
            page: page
          },
          header: {
            'content-type': 'application/json'
          },
          method: 'POST',
          success: function (res) {

            if(res.data.results.length>0){
              for (var i = 0; i < res.data.results.length; i++) {
                that.setData({
                  results:that.results.push(res.data.results[i])
                })
              }
            }else{
              wx.showToast({
                title: '没有更多数据了',
                icon: 'success',
                duration: 1000
              })
            }
            console.log(res.data)
            // that.setData({
            //   results: res.data.results
            // })
            wx.hideLoading();
          },
          fail: function (res) {
            console.log(res)
          },
          complete: function (res) { },
        })

      }
    })
    this.setData({
      loadPage:page+1
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
    this.getData();
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
    wx.stopPullDownRefresh();
    // this.
    this.getData();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log(1)
    this.loadMore()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  fnOpenWin:function(e){
    var id = e.currentTarget.dataset.id;
    // console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../orderDetails/orderDetails?id='+id
    })
  }
})
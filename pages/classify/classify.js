// pages/classify/classify.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      money:0,
      submit:'alert',
      textClass:'',
      // item:{
      //   isChecked:true
      // }
      id:'',
      items:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this;
    // console.log(options.id);
    this.setData({
      id:options.id
    })
    this.getData()
  },

  //获取信息列表
  getData:function(){
    // console.log(_id)
    wx.showLoading({
      title: '加载中',
    })
    var id =this.data.id;
    var that = this;
    wx.request({
      url: app.APIURL + 'sub_category',
      method: 'POST',
      data: {
        'id':id
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        // console.log(res)
        that.setData({
          items: res.data.results
        })
        wx.hideLoading();
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
    wx.stopPullDownRefresh() ;
    console.log(1)
    this.getData();
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


  submit:function(){
    var data={};
    var money = this.data.money;
    var id = this.data.id
    // console.log(data)
    wx.navigateTo({
      url: '../yuyue/yuyue?money='+money+'&id='+id
    })
  },
  checked:function(e){
    // console.log(e);
    var that = this;

    // var data = e.

    //设置按钮选中
    var currentItem = e.currentTarget.dataset;
    console.log(currentItem);
    var data = this.data.items.map(function(item){
      if(item.id!=currentItem.id){
        item.isChecked = false
      }else {
        item.isChecked = true
      }
      return item
    })
    // console.log(data);

    this.setData({
      items: data
    });

    //获取id
    this.setData({
      id: e.currentTarget.dataset.id
    })
    //获取价格
    var money = e.currentTarget.dataset.money;
    // console.log(money);
    this.setData({
      money:money
    })
  }

})
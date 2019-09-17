// pages/comment/comment.js
import {
  network
} from "../../utils/network.js"
Page({
  /**
   * 页面的初始数据
   */
  data: {
    total: 0,
    start: 1,
    count: 20
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log(options, "Pages/comment")
    var that = this;
    that.setData(options);
    that.getComments(1)
  },
  //请求评论条数
  getComments: function(start) {
    var that = this;
    var type = that.data.type;
    var id = that.data.id;
    if (start > that.data.start) {
      that.setData({
        nextLoading: true
      })
    } else {
      that.setData({
        preLoading: true
      })
    }
    network.getItemComments({
      type: type,
      id: id,
      start: start,
      count: 20,
      success: function(res) {
        // console.log(res, "Pages/comment")
        var total = res.total;
        var comments = res.interests;
        that.setData({
          total: total,
          comments: comments,
          start: start,
          nextLoading: false,
          preLoading: false
        })
      }
    })
  },
  // 点击返回上一级
  onItemTapEvent: function(event) {
    wx.navigateBack({})
  },
  //上一页
  onPerPage: function(event) {
    var that = this;
    var oldStart = that.data.start;
    var count = that.data.count
    if (oldStart - count > 0) {
      var start = oldStart - count;
    }
    that.getComments(start)
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 0
    })
  },
  //下一页
  onNextPage: function(event) {
    var that = this;
    var oldStart = that.data.start;
    var strat = oldStart + that.data.count;
    that.getComments(strat);
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 0
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
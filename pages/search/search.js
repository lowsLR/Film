// pages/search/search.js
import {
  network
} from "../../utils/network.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    //异步 保存缓存
    wx.getStorage({
      key: 'searched',
      success: function(res) {
        console.log(res, "getStorage");
        var data = res.data;
        that.setData({
          historyies: data
        })
      },
    })
  },

  //自定义组件触发后的方法
  onSearch: function(e) {
    // console.log(e,"eeee")   
    var that = this;
    var value = e.detail.value;
    if (!value || value === "") {
      that.setData({
        subjects: null
      })
      return;
    }
    network.getSearchList({
      q: value,
      success: function(subjects) {
        that.setData({
          subjects: subjects
        })
      }
    })
  },

  //点击跳转
  onItemEvent: function(event) {
    var that = this;
    var id = event.currentTarget.dataset.id;
    var title = event.currentTarget.dataset.title;
    var historyies = that.data.historyies;
    var isExisted = false;
    if (historyies) {
      for (var i = 0; i < historyies.length; i++) {
        var movie = historyies[i]
        if (movie.id === id) {
          isExisted = true;
          break;
        }
      }
    }
    if (!isExisted) {
      if (!historyies) {
        historyies = []
      }
      historyies.push({
        id: id,
        title: title
      })
      wx.setStorage({
        key: 'searched',
        data: historyies,
        success: function () {
          console.log("保存成功！")
        }
      })
    }


    wx.navigateTo({
      url: '/pages/detail/detail?type=movie&id=' + id,
    })
  },
  //清除历史记录
  onClearEvent: function(event) {
    var that = this;
    //局部清除数据
    wx.removeStorage({
      key: 'searched',
      success: function(res) {
        console.log("清除成功")
      },
    })
    that.setData({
      historyies: null
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
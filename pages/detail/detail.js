// pages/detail/detail.js
import {
  network
} from "../../utils/network.js";
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
    // console.log(options, "detail")
    var that = this;
    var type = options.type;
    var id = options.id;
    that.setData({
      type: type,
      id: id
    })
    //渲染海报上映等信息
    network.getItemDetail({
      type: type,
      id: id,
      success: function(item) {
        // console.log(item, "detail")
        var genres = item.genres;
        genres = genres.join("/");
        item.genres = genres;
        var actors = item.actors;
        var actorsNames = [];
        if (actors.length > 3) {
          actors = actors.slice(0, 3);
        }
        for (var i = 0; i < actors.length; i++) {
          var actorsName = actors[i].name
          actorsNames.push(actorsName)
        }
        actorsNames = actorsNames.join("/");
        var directors = item.directors[0].name;
        var authors = directors + "(导演)/" + actorsNames;
        item.authors = authors;
        // console.log(item.genres,"aaaa")
        that.setData({
          item: item
        })
      }
    })
    //渲染海报标签
    network.getItemTags({
      type: type,
      id: id,
      success: function(tags) {
        that.setData({
          tags: tags
        })
      }
    })
    //海报评论
    network.getItemComments({
      type: type,
      id: id,
      success: function(data) {
        // console.log(data, "comments")
        var totalComment = data.total;
        var comments = data.interests;
        that.setData({
          totalComment: totalComment,
          comments: comments
        })
      }
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
    // 设置页面滚动位置
    wx.pageScrollTo({
      scrollTop: 0,
    })
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
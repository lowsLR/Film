import {
  globalurls
} from "urls.js"

const network = {
  //请求电影
  getMoviesList: function(params) {
    params.type = "movie";
    this.getItemList(params)
  },
  //电视剧
  getTvsList: function(params) {
    params.type = "tv";
    this.getItemList(params)
  },
  // 综艺
  getShowsList: function(params) {
    params.type = "show";
    this.getItemList(params)
  },
  //更多列表
  getItemList: function(params) {
    var url = "";
    if (params.type === "movie") {
      url = globalurls.movieList;
    } else if (params.type === "tv") {
      url = globalurls.tvList;
    } else {
      url = globalurls.showLis;
    }
    var count = params.count ? params.count : 7
    wx.request({
      url: url,
      data: {
        count: count
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        // console.log(res.data)
        var items = res.data.subject_collection_items;
        //itemsCount 是为了判断列表最后一排的数量是否足三张
        var itemsCount = items.length;
        var left = itemsCount % 3;
        if (left === 2) {
          items.push(null)
        }
        // console.log(shows)
        if (params && params.success) {
          params.success(items)
        }
      }
    })
  },
  //详情列表
  getItemDetail: function(params) {
    var type = params.type;
    var id = params.id;
    var url = "";
    // console.log(type, "aaaa")
    if (type === "movie") {
      url = globalurls.movieDetail + id
    } else if (type === "tv") {
      url = globalurls.tvDetail + id
    } else {
      url = globalurls.showDetail + id
    }
    wx.request({
      url: url,
      success: function(res) {
        // console.log(res, "urls")
        var item = res.data;
        if (params.success) {
          params.success(item)
        }
      }
    })
  },
  //详情列表的标签
  getItemTags: function(params) {
    var type = params.type;
    var id = params.id;
    var url = ""
    if (type === "movie") {
      url = globalurls.movieTags(id)
    } else if (type === "tv") {
      url = globalurls.tvTags(id)
    } else {
      url = globalurls.showTags(id)
    }
    wx.request({
      url: url,
      success: function(res) {
        // console.log(res, "tags")
        var tags = res.data.tags;
        if (params.success) {
          params.success(tags)
        }
      }
    })
  },
  //详情列表评论
  getItemComments: function(params) {
    var type = params.type;
    console.log(type, "getItemComments")
    var id = params.id;
    console.log(id, "getItemComments")
    var start = params.start ? params.start : 0;
    var count = params.count ? params.count : 3;
    var url = "";
    if (type === "movie") {
      url = globalurls.movieComments(id, start, count);
    } else if (type === "tv") {
      url = globalurls.tvComments(id, start, count);
    } else {
      url = globalurls.showComments(id, start, count);
    }
    wx.request({
      url: url,
      success: function(res) {
        console.log(res, "comments")
        var res = res.data;
        if (params.success) {
          params.success(res)
        }
      }
    })
  },
  //搜索列表
  getSearchList: function(params) {
    var q = params.q;
    var url = globalurls.searchUrl(q)
    wx.request({
      url: url,
      success: function(e) {
        var subjects = e.data.subjects;
        if (params.success) {
          params.success(subjects)
        }
      }
    })
  }
}

export {
  network
}
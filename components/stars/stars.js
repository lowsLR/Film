// components/stars/stars.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    rate: {
      type: Number,
      value: 0,
      observer: function(newVal, oldVal) {
        // 属性值变化时执行
        this.updateRate()
      }
    },
    starSize: {
      type: Number,
      value: 20
    },
    fontSize: {
      type: Number,
      value: 20,
    },
    fontColor: {
      type: String,
      value: "#ccc"
    },
    istext: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    updateRate: function() {
      var that = this;
      // console.log(that.properties.rate, "rate")
      var rate = that.properties.rate;
      //  console.log(rate, "====rate====")
      var intRate = parseInt(rate);
      var light = Math.floor(parseInt(intRate / 2))
      var gray = 5 - light;
      var lights = [];
      var grays = [];
      for (var i = 1; i <= light; i++) {
        lights.push(i)
      }
      for (var i = 1; i <= gray; i++) {
        grays.push(i)
      }
      var rateText = rate && rate > 0 ? rate.toFixed(1) : "未评分"
      //toFixed(num)保留num位小数
      that.setData({
        lights: lights,
        grays: grays,
        rateText: rateText
      })
    }
  },

  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
      this.updateRate()
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
  }
})
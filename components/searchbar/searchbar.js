// component/searchbar/searchbar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isnavigator: {
      type: Boolean,
      value: false
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
    onInputEvent: function(event) {
      // console.log(event)
      var value = event.detail.value; //获取输入框的内容
      var detail = {
        "value": value
      };
      var options = {}
      //自定义组件触发事件时，需要使用 triggerEvent 方法，指定事件名、detail对象和事件选项：
      this.triggerEvent("searchIpnut", detail, options)
    }
  }
})
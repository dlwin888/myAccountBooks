// pages/charge/charge.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['餐饮', '交通', '通讯', '购物']
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
    bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
    formSubmit: function (e) {
      console.log('form发生了submit事件，携带数据为：', e.detail.value)
    }
})
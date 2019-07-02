// miniprogram/pages/config/config.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: '',
    budget: 500
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid
      })
    }

    const db = wx.cloud.database()
    db.collection('config').doc('0').get().then(res => {
      console.log(res.data)
      this.setData({
        budget: res.data.budget
      })
    })
  },
  updateBudget: function(e) {
    const db = wx.cloud.database()
    db.collection('config').doc('0').update({
      data: {
        budget: e.detail.value.budget
      }
    }).then(res => {
      console.log(res)
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
// pages/consume/consume.js
var wxCharts = require('../../utils/wxcharts-min.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
        //本月消费
        monthSpend: 0,
        //今日消费
        todaySpend: 0,
        //日均消费
        avgSpendPerDay: 0,
        //本月剩余
        monthAvailable: 0,
        //日均可用
        dayAvgAvailable: 0,
        //距离月末
        monthLeftDay: 0,
        //使用比例
        usagePercentage: 0,
        //是否超支
        isOverSpend: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.setData({
    //   db: wx.cloud.database()
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var ringChart = new wxCharts({
      animation: true,
      canvasId: 'ringCanvas',
      type: 'ring',
      extra: {
        ringWidth: 25,
        pie: {
          offsetAngle: -45
        }
      },
      title: {
        name: this.data.usagePercentage + '%',
        color: '#7cb5ec',
        fontSize: 20
      },
      subtitle: {
        name: '已消费',
        color: '#666666',
        fontSize: 13
      },
      series: [{
        name: '本月消费',
        data: this.data.monthSpend,
        stroke: false
      }, {
        name: '本月剩余',
        data: this.data.monthAvailable,
        stroke: false
      }],
      disablePieStroke: true,
      width: 150,
      height: 213,
      dataLabel: false,
      legend: false,
      background: '#f5f5f5',
      padding: 0
    });
    
    ringChart.addEventListener('renderComplete', () => {
      console.log('renderComplete');
    });
    setTimeout(() => {
      ringChart.stopAnimation();
    }, 500);
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
  
  }
})
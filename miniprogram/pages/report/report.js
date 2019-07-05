// pages/report/report.js
var wxCharts = require('../../utils/wxcharts-min.js');
var app = getApp();
var columnChart = null;
var chartData = {
  main: {
    title: '月消费报表',
    data: [15, 20, 45, 37],
    categories: ['1日', '2日', '4日', '13日']
  }
};
Page({
  data: {
    chartTitle: '月消费报表'
  },
  onReady: function (e) {
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }

    columnChart = new wxCharts({
      canvasId: 'columnCanvas',
      type: 'column',
      animation: true,
      categories: chartData.main.categories,
      series: [{
        name: '月消费',
        data: chartData.main.data,
        format: function (val, name) {
          return val.toFixed(2) + '元';
        }
      }],
      yAxis: {
        format: function (val) {
          return val + '元';
        },
        title: '',
        min: 0
      },
      xAxis: {
        disableGrid: false,
        type: 'calibration'
      },
      extra: {
        column: {
          width: 15
        }
      },
      legend: false,
      width: windowWidth,
      height: 150,
    });
  }
});
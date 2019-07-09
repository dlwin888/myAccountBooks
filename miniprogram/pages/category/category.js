// pages/category/category.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categoryList: [
      { name: "餐饮", count: 0 }, 
      { name: "交通", count: 0 }, 
      { name: "住宿", count: 0 },
      { name: "话费", count: 0 }
    ],
    newCategoryName: '',
    newCategoryCount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      db: wx.cloud.database()
    })
    
    this.getCategoryList()
  },

  getCategoryList: function(e) {
    const db = this.data.db;
    db.collection('category').count()
      .then(res => {
        if (res.total) {
          db.collection('category').get().then(res => {
            this.setData({
              categoryList: res.data.categoryList
            })
          })
        }
        else {
          db.collection('category').add({
            data: {
              categoryList: res.data.categoryList
            }
          }).then(res => {
            console.log(res)
          })
        }
      })
      .catch(console.error);
  },
  add: function(e){
    wx.showModal({
      title: '提示',
      content: `<view class="section">
        <input name="categoryName" bindinput="bindNameInput" placeholder="分类名称" auto-focus/>
        <input name="categoryCount" bindinput="bindCountInput" type="number" placeholder="消费次数" /> 
        </view>`
      ,
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          if(!this.data.newCategoryName){
            wx.showToast({
              title: '分类名称不能为空',
              icon: 'success',
              duration: 1000
            })   
          }
          else {
            this.data.categoryList.add({ name: this.data.newCategoryName, count: this.data.newCategoryCount })
            this.setData({
              categoryList: this.data.categoryList
            })
            db.collection('category').add({
              data: {
                categoryList: this.data.categoryList
              }
            }).then(res => {
              console.log(res)

              this.setData({
                newCategoryName: '',
                newCategoryCount: 0
              })
            })
          }
        } else if (res.cancel) {
          console.log('用户点击取消')
          this.setData({
            newCategoryName: '',
            newCategoryCount: 0
          })
        }
      }
    })
  },
  edit: function(e){
    
  },
  del: function(e){
    
  },
  bindNameInput: function(e){
    this.setData({
      newCategoryName: e.detail.value
    })
  },
  bindNameInput: function(e){
    this.setData({
      newCategoryCount: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
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
// pages/category/category.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categoryList: [{
        name: "餐饮",
        count: 0
      },
      {
        name: "交通",
        count: 0
      },
      {
        name: "住宿",
        count: 0
      },
      {
        name: "话费",
        count: 0
      }
    ],
    addtell: {
      addtellHidden: true, //弹出框显示/隐藏
      categoryName: '',
      categoryCount: '',
      opttype: 'add'
    },
    newCategoryName: '',
    newCategoryCount: 0,
    _id: 0,
    categorySelect: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      db: wx.cloud.database()
    })

    this.getCategoryList()
  },
  onActive: function(e) {
    this.setData({
      categorySelect: e.currentTarget.dataset.index
    })
  },

  getCategoryList: function(e) {
    const db = this.data.db;
    db.collection('category').count()
      .then(res => {
        if (res.total) {
          db.collection('category').get().then(res => {
            this.setData({
              categoryList: res.data[0].categoryList,
              _id: res.data[0]._id
            })
          })
        } else {
          db.collection('category').add({
            data: {
              categoryList: this.data.categoryList
            }
          }).then(res => {
            console.log(res)
            this.setData({
              _id: res._id
            })
          })
        }
      })
      .catch(console.error);
  },
  add: function(e) {
    //打开弹出框
    this.setData({
      addtell: {
        addtellHidden: false,
        opttype: 'add'
      }
    })
  },
  edit: function(e) {
    let cur = this.data.categoryList[this.data.categorySelect];
    this.setData({
      addtell: {
        addtellHidden: false,
        categoryName: cur.name,
        categoryCount: cur.count,
        opttype: 'edit'
      },
      newCategoryName: cur.name,
      newCategoryCount: cur.count
    })
  },
  del: function(e) {
    this.data.categoryList.splice(this.data.categorySelect, 1); 
    this.updateCategory();
  },
  updateCategory: function(){
    this.setData({
      categoryList: this.data.categoryList
    })
    const db = this.data.db;
    db.collection('category').doc(this.data._id).update({
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
  },
  bindNameInput: function(e) {
    this.setData({
      newCategoryName: e.detail.value
    })
  },
  bindCountInput: function (e) {
    this.setData({
      newCategoryCount: parseInt(e.detail.value)
    })
  },
  modalConfirm: function() {
    console.log('用户点击确定')
    let optType = this.data.addtell.opttype;
    if (optType == 'add'){
      if (!this.data.newCategoryName) {
        wx.showToast({
          title: '分类名称不能为空',
          icon: 'success',
          duration: 1000
        })
      } else {
        this.data.categoryList.push({
          name: this.data.newCategoryName,
          count: this.data.newCategoryCount
        })
        this.updateCategory();
      }
    }
    else if(optType == 'edit'){
      let cur = this.data.categoryList[this.data.categorySelect];
      if (cur.name != this.data.newCategoryName || cur.count != this.data.newCategoryCount){
        this.data.categoryList[this.data.categorySelect].count = this.data.newCategoryCount;
        this.updateCategory();
      }
    }

    //弹出框确认操作
    this.setData({
      'addtell.addtellHidden': true  
    })
  },
  modalCancel: function() {
    //弹出框取消操作
    this.setData({
      'addtell.addtellHidden': true  
    })

    console.log('用户点击取消')
    this.setData({
      newCategoryName: '',
      newCategoryCount: 0
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
// miniprogram/pages/Bianxie/Bianxie.js
const app = getApp()
const db = wx.cloud.database()
const testcollectionLunTanImage = db.collection('LunTanImage')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    guanbiiocn: 'https://7975-yuexia-1302601811.tcb.qcloud.la/关闭.png',
    imgs: [],
    imagsPath: 'LunTanImage',
    imagsShow: [],
    imagedata: [],
    fontValue: '',
    userInfoOpenid: '',
    userImgeUrl:'',
    userName:''
  },
   
  //获取input的value的值并赋值给data
  textInputValue: function (e) {
    console.log(e.detail.value)
    this.setData({
      fontValue: e.detail.value
    })
  },
  //调用上传图片的接口
  upImage: function (e) {
    var that = this;
    if (this.data.imgs.length >= 5) {
      wx.showToast({
        title: '最大限制',
      })
    } else {
      wx.chooseImage({
        //调起相册或相机选择图片
        count: 5,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: (res) => {
          //接口调用成功后返回的参数
          var tempFilePath = res.tempFilePaths;
          var imgs = that.data.imgs;
          for (var i = 0; i < tempFilePath.length; i++) {
            imgs.push(tempFilePath[i])
            wx.previewImage({
              current: imgs,
              urls: imgs,
            })
            console.log("临时文件路径：" + imgs[i])
          }
          that.setData({
            imgs: imgs
          })
        },
        fail: (res) => {},
        complete: (res) => {},
      })
    }
  },
  //上传论坛文章
  upImageFile: function (res) {
    const myDate = new Date();
    const myDateMonth = myDate.getMonth()+1;
    const myDates = myDate.getDate();
    const myDateHou = myDate.getHours();
    const myDateMinutes = myDate.getMinutes();
    const that = this;
    const _ = db.command;
    const dataId = this.data.userInfoOpenid+ Math.random() / 9999;
    const datafont = this.data.fontValue;
    db.collection('LunTanImage').add({
      data:{
        _id:dataId,
        texts:datafont,
        userImgeUrl:this.data.userImgeUrl,
        userName:this.data.userName,
        value:[],
        data:myDateMonth+'月'+myDates+'日'+myDateHou+':'+myDateMinutes
      }
    })
    console.log(dataId)
    //将图片存入数据库中 
    wx.showLoading({
      title: '上传中',
    })
    //上传图片数据
    for (var i = 0; i < this.data.imgs.length; i++){
      const _ = db.command;
      wx.cloud.uploadFile({
        cloudPath: 'LunTanImage' + '/abcd' + i + '.png' + Math.random() / 9999,
        filePath: that.data.imgs[i],
        success(res) {
          //把临时文件转为文件ID的数据写进数据库
          console.log("文件路径"+res.fileID)
          const Url = res.fileID
          db.collection('LunTanImage').doc(''+[dataId]+'').update({
            data: {
              value: _.push(Url)
            },
            success: function (res) {
              wx.showToast({
                title: '上传成功',
                icon: 'success',
                duration: 2000
              })
              console.log("写入完成" + Url)
            }
          })
        },
        fail: e => {
          console.log("失败" + e)
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.userName=app.globalData.userInfo.nickName;
    this.data.userImgeUrl=app.globalData.userInfo.avatarUrl
    wx.cloud.callFunction({
      name: 'userInfo',
      complete: res => {
        this.setData({
          userInfoOpenid: res.result.openid
        })
        console.log('callFunction test result: ', this.data.userInfoOpenid)
      }
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
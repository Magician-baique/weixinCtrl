// pages/luntan/luntan.js
const db = wx.cloud.database()
const testcollection = db.collection('area')
const testcollectionLunTanImage = db.collection('LunTanImage')
const app = getApp()
Page({
  data: {
    // infoLike:'cloud://yuexia.7975-yuexia-1302601811/info/like.png',
    infoLike1:[],
    infoMessage:'cloud://yuexia.7975-yuexia-1302601811/info/message.png',
    infoGd:'cloud://yuexia.7975-yuexia-1302601811/info/switch.png',
    BianxieImage:"https://7975-yuexia-1302601811.tcb.qcloud.la/%E7%BC%96%E8%BE%91.png?sign=204849c5252b8b50041bce074b64ea49&t=1595065619",
    updateLunTanImage:'',
    userImageUrl:'',
    imgsrc:'',
    showImage:false,
    Mission:[],
  },
  //跳转到编辑论坛面板
  bianXie:function(){
    wx.navigateTo({
      url: '../Bianxie/Bianxie',
    })
  },
  //页面初次渲染
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    db.collection('LunTanImage').get().then(res=>{
      this.setData({
        updateLunTanTxt:res.data
      })
      for(var i = 0;i<res.data.length;i++){
        this.data.infoLike1.push("cloud://yuexia.7975-yuexia-1302601811/info/like_fill.png")
        console.log(i+":"+this.data.infoLike1[i])
      }
    })
    //数组自增
  },
  //下拉刷新数据
  onPullDownRefresh:function(res){
    testcollection.get().then(res => {
      console.log(res.data)
      this.setData({
        updata: res.data,
      },res=>{
        wx.stopPullDownRefresh()
      })
    })
    testcollectionLunTanImage.get().then(res => {
      this.setData({
        updateLunTanTxt:res.data
      },res=>{
        wx.stopPullDownRefresh()
        wx.showToast({
          title: '刷新成功',
          icon: 'success',
          duration: 2000
        })
      })
    })
    console.log("刷新成功")
  },

//点赞、评论、转发、举报
  cloas:function(e){
    console.log(e)
    const a = e.currentTarget.id;
    const b = e.currentTarget.dataset.id;
    console.log(a)
    console.log(b)
  }
})
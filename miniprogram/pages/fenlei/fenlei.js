// pages/fenlei/fenlei.js
const app = getApp()
const db = wx.cloud.database()
const testcollectionFenLei = db.collection('FenLei')
const testcollectionShangYeQu = db.collection('ShangYeQu')
const testcollectionShengHuoQu = db.collection('ShengHuoQu')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    Fenlei:'',
    ShouQiName:"展开",
    ShouQiName1:"展开",
    ShouQiName2:"展开",
    ShouQi:'font-size:27rpx;text-arign:center;',
    ShouQi2:'font-size:27rpx;text-arign:center;',
    ShouQi3:'font-size:27rpx;text-arign:center;',
    If1:false,
    If2:false,
    If3:false,
    CtrlList1:'display:block',
    CtrlList2:'display:none',
    CtrlList1_1:'display:block',
    CtrlList1_2:'display:none',
    CtrlList2_1:'display:block',
    CtrlList2_2:'display:none'
  },


  GuanZhuShouQi:function(){
    if(this.data.If1==false){
      this.setData({
        ShouQi:'font-size:27rpx;text-arign:center;transform: rotate(180deg);transition: 0.5s;',
        ShouQiName:'收起',
        CtrlList1:'display:none',
        CtrlList2:'display:block',
        If1:true,
      })
    }else{
      this.setData({
        ShouQi:'transform: rotate(0deg);transition: 0.5s;',
        ShouQiName:'展开',
        CtrlList1:'display:block',
        CtrlList2:'display:none',
        If1:false,
      })
    }
  },
  GuanZhuShouQi1:function(){
    if(this.data.If2==false){
      this.setData({
        ShouQi1:'font-size:27rpx;text-arign:center;transform: rotate(180deg);transition: 0.5s;',
        ShouQiName1:'收起',
        CtrlList1_1:'display:none',
        CtrlList1_2:'display:block',
        If2:true,
      })
    }else{
      this.setData({
        ShouQi1:'transform: rotate(0deg);transition: 0.5s;',
        ShouQiName1:'展开',
        CtrlList1_1:'display:block',
        CtrlList1_2:'display:none',
        If2:false,
      })
    }
  },

  GuanZhuShouQi2:function(){
    if(this.data.If3==false){
      this.setData({
        ShouQi3:'font-size:27rpx;text-arign:center;transform: rotate(180deg);transition: 0.5s;',
        ShouQiName2:'收起',
        CtrlList2_1:'display:none',
        CtrlList2_2:'display:block',
        If3:true,
      })
    }else{
      this.setData({
        ShouQi3:'transform: rotate(0deg);transition: 0.5s;',
        ShouQiName2:'展开',
        CtrlList2_1:'display:block',
        CtrlList2_2:'display:none',
        If3:false,
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.request({
    //   method:"POST",
    //   url: 'http://rap2.taobao.org:38080/app/mock/262249/testThere',
    //   data:{
    //     name:1
    //   },
    //   success(res){
    //     console.log(res)
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    testcollectionFenLei.get().then(res=>{
      this.setData({
        FenLei:res.data
      })
      console.log(res.data)
    })
    testcollectionShangYeQu.get().then(res=>{
      this.setData({
        ShangYeQu:res.data
      })
      console.log(res.data)
    })
    testcollectionShengHuoQu.get().then(res=>{
      this.setData({
        ShengHuoQu:res.data
      })
      console.log(res.data)
    })
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
    wx.showLoading({
      title: '刷新中',
    })

    testcollectionFenLei.get().then(res=>{
      this.setData({
        FenLei:res.data
      },res=>{
        wx.stopPullDownRefresh()
      })
      console.log(res.data)
    })


    testcollectionShangYeQu.get().then(res=>{
      this.setData({
        ShangYeQu:res.data
      },res=>{
        wx.stopPullDownRefresh()
      })
      console.log(res.data)
    })


    testcollectionShengHuoQu.get().then(res=>{
      this.setData({
        ShengHuoQu:res.data
      },res=>{
        wx.stopPullDownRefresh()
        wx.showToast({
          title: '刷新成功',
          icon: 'success',
          duration: 2000
        })
      })
      console.log(res.data)
    })
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
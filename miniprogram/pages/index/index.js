//index.js
//获取应用实例
const app = getApp()
const db = wx.cloud.database()
const testcollectionUserx = db.collection('userx')
Page({
  data: {
    motto: 'Hello World',
    styleDispaly: false,
    chushimsg:false,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    message: '80px',
    imagegps2:'cloud://yuexia.7975-yuexia-1302601811/sd.png',
    "imagegps": [
    {
      "url": "cloud://yuexia.7975-yuexia-1302601811/lunbo/xp1.jpg"
    },
    {
      "url": "cloud://yuexia.7975-yuexia-1302601811/lunbo/xp2.jpg"
    },
    {
      "url": "cloud://yuexia.7975-yuexia-1302601811/lunbo/xp3.jpg"
    },
    {
      "url":"cloud://yuexia.7975-yuexia-1302601811/lunbo/xp4.jpg"
    }
  ],
    shnangJiaYi: '商家信息',
    dltanchuang: "width:70%;height:1200rpx;background-color:#fff;margin-left:-70%",
    displaykz: false,
    gerenjianjie: '没有简介',
    dingbuds: 'display:block;transition: 0.5s;',
    xinInput: 'display:none',
    userXiValue: '',
    userInfoOpenid:'',
    update:'',
    bool:false,
    "bnrUrl": [{
        "url": "cloud://yuexia.7975-yuexia-1302601811/lunbo/lbsd2.jpg"
      },
      {
        "url": "cloud://yuexia.7975-yuexia-1302601811/lunbo/lbsd3.jpg"
      },
      {
        "url": "cloud://yuexia.7975-yuexia-1302601811/lunbo/lbsd1.jpg"
      },
    ]
  },
  //事件处理函数
  userxinxi: function () {
    //控制个性标签编辑框的显示或隐藏
    this.setData({
      xinInput: 'display:block',
      displaykz: true,
    })
  },
  //获取个性标签输入框中的内容并赋值到data
  textInputValue: function (e) {
    console.log(e.detail.value)
    this.setData({
      userXiValue: e.detail.value
    })
  },
  //上传简介到数据库并渲染到页面同时隐藏编辑面板
  upUserxi: function (event,res) {
    //判断输入是否为空，为空就不调用写入数据库方法
    if (this.data.userXiValue != "") {
      //将用户openidid引用成字段id并修改个性签名
      testcollectionUserx.where({
        _openid:this.data.userInfoOpenid
      }).update({
        data:{
          value:this.data.userXiValue
        },
        success:function(res){
          console.log("个性签名更新完成")
        }
      })
    }
    //从数据库中取出编辑上传后的个性签名数据并赋值给updata
    testcollectionUserx.get().then(res=>{
      this.setData({
        update:res.data
      })
    })
    //回调数据成功后清空个性签名输入框中的内容
    this.setData({
      userXiValue:''
    }),
    //全部数据执行完成后隐藏个性签名输入框
    this.setData({
      xinInput: 'display:none',
    })
  },
  //调出个人中心面板
  bindViewTap: function () {
    if(this.data.bool==false){
    wx.showModal({
      title: '提示',
      content: '再次点击头像关闭弹窗',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    this.setData({
     bool:true
    })
    
  }
    //从云函数中获取用户的openid并传递给data
    wx.cloud.callFunction({
      name: 'userInfo',
      complete: res => {
        this.setData({
          userInfoOpenid:res.result.openid
        })
        console.log('callFunction test result: ',this.data.userInfoOpenid)
        // db.collection('LunTanImage').add({
        //   data:{
        //     _id:res.result.openid,
        //     texts:'00000000000000',
        //     userImgeUrl:'',
        //     value:[]
        //   }
        // })
      }
    })
    testcollectionUserx.get().then(res=>{
      this.setData({
        update:res.data
      })
    })
  //   if(this.data.chushimsg==false){

  //     this.setData({
  //       chushimsg:true
  //     })
  // }
    // wx.navigateTo({
    //   url: '../logs/logs'
    // })
    //更新个性签名内容
    //判断当前弹出窗口是否已弹出，并设置对应的样式
    if (this.data.displaykz == false) {
      this.setData({
        dltanchuang: "width:70%;height:100%;background-color:#fff;-webkit-box-shadow: #000 0px 20px 20px;-moz-box-shadow: #000 0px 10px 10px; box-shadow: #000 0px 10px 10px;transition: 0.5s;",
        displaykz: true,
        dingbuds: 'margin-top:-13%;transition: 0.5s;',
      })
    } else {
      this.setData({
        dltanchuang: "width:70%;height:100%;background-color:#fff;margin-left:-70%;transition: 0.5s;",
        displaykz: false,
        dingbuds: 'display:block;margin:0;transition: 0.5s',
      })
    }
  },
  //获取用户信息
  onLoad: function () {
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
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  bindInputHidel: function (e) {
    this.setData({
      message: e.detail.value
    })
  },
})  
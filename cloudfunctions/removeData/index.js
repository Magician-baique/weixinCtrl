// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command
const testcollection = db.collection('userx')
// 云函数入口函数
exports.main = async (event, context) => {
  // return new Promise()
  const wxContext = cloud.getWXContext()
  try{
    return await db.collection('userx').where({
      _openid:wxContext.OPENID
    }).remove()
  }catch(e){
    console.error(e)
  }
  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
}
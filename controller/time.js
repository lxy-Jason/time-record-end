const Time = require('../model/time')
const getMonday = require('../utils/getMonday')
const getWeekTime = require('../utils/getWeekTime')

//时间上传
const upload = async ctx => {
  let { username, time, startTime, endTime } = ctx.request.body;
  await Time.create({ username, time, startTime, endTime }).then(rel => {
    if (rel) {
      ctx.body = {
        code: 200,
        msg: '时间记录上传成功'
      }
    }
    else {
      ctx.body = {
        code: 300,
        msg: '上传失败'
      }
    }
  }).catch(err => {
    ctx.body = {
      code: 500,
      msg: '服务器错误,上传失败',
      err
    }
  })
}
//获取本周学习时间
const getWeek = async ctx => {
  let {username} = ctx.query
  var monday = getMonday(new Date()).getTime();
  await Time.find({ username, endTime: { $gte: monday } }).then(res => {
    if (res) {
      let time = getWeekTime(res)
      console.log(time);
      ctx.body = {
        code: 200,
        time,
        msg:'本周学习时长'
      }
    }
    else {
      cxy.body = {
        code:300,
        time:'00:00:00',
        msg:'本周还未学习'
      }
    }
  }).catch(err => {
    ctx.body = {
      code:500,
      msg:'服务器错误',
      err
    }
  })
}



module.exports = {
  upload,
  getWeek
}
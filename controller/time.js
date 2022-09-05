const Time = require('../model/time')
const Users = require('../model/users')
const getMonday = require('../utils/getMonday')
const getWeekTime = require('../utils/getWeekTime')

//时间上传
const upload = async ctx => {
  let { username, time, timeStamp, startTime, endTime } = ctx.request.body;
  await Time.create({ username, time, timeStamp, startTime, endTime }).then(rel => {
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
  let { username } = ctx.query
  var monday = getMonday(new Date()).getTime();
  await Time.find({ username, endTime: { $gte: monday } }).then(res => {
    if (res) {
      let time = getWeekTime(res)
      console.log(time);
      ctx.body = {
        code: 200,
        time,
        msg: '本周学习时长'
      }
    }
    else {
      cxy.body = {
        code: 300,
        time: '00:00:00',
        msg: '本周还未学习'
      }
    }
  }).catch(err => {
    ctx.body = {
      code: 500,
      msg: '服务器错误',
      err
    }
  })
}
// 获取所有用户本周学习时间
const getAllUserWeekTime = async ctx => {
  var monday = getMonday(new Date()).getTime()

  let usersArr = await Time.aggregate([
    {
      '$match': {
        'endTime': {
          '$gte': monday
        }
      }
    }, {
      '$group': {
        '_id': '$username',
        'totalWeekTime': {
          '$sum': '$timeStamp'
        }
      }
    }, {
      '$sort': {
        'totalWeekTime': -1
      }
    }
  ])
  // console.log(usersArr);
  if (usersArr) {
    ctx.body = {
      code: 200,
      msg: '获取本周所有用户时长成功',
      usersArr,
    }
  }
  else {
    ctx.body = {
      code:300,
      msg:'本周还没有用户学习'
    }
  }
}


module.exports = {
  upload,
  getWeek,
  getAllUserWeekTime
}
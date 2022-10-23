const Time = require("../model/time");
const Users = require("../model/users");
const getMonday = require("../utils/getMonday");
const getWeekTime = require("../utils/getWeekTime");
const getRank = require("../utils/getRank");
const getMonthFirstDay = require("../utils/getMonthFirstDay");
const {
  getEveryWeekTimePart,
  getTodayStart,
  getEveryHoursTimePart,
} = require("../utils/moment");
const getTimeInterval = require("../utils/getTimeInterval")
const getTotalTime = require("../utils/getTotalTime")

//时间上传
const upload = async (ctx) => {
  let { username, time, timeStamp, startTime, endTime } = ctx.request.body;
  await Time.create({ username, time, timeStamp, startTime, endTime })
    .then((rel) => {
      if (rel) {
        ctx.body = {
          code: 200,
          msg: "时间记录上传成功",
        };
      } else {
        ctx.body = {
          code: 300,
          msg: "上传失败",
        };
      }
    })
    .catch((err) => {
      ctx.body = {
        code: 500,
        msg: "服务器错误,上传失败",
        err,
      };
    });
};
//获取用户本周学习时间
const getWeek = async (ctx) => {
  let { username } = ctx.query;
  var monday = getMonday(new Date()).getTime();
  let usersArr = await getRank(monday);
  let userInfo = usersArr.find((item,index) => {
    if(item._id === username){
      item.rank = index
    }
    return item._id === username
  });
  if(userInfo){
    let time = getTotalTime(userInfo.totalWeekTime)
    ctx.body = {
      code: 200,
      time,
      msg: "本周学习时长",
      rank:userInfo.rank
    };
  }
  else {
    ctx.body = {
      code: 300,
      time: "00:00:00",
      msg: "本周还未学习",
    };
  }
 
};
// 获取所有用户本周学习时间
const getAllUserWeekTime = async (ctx) => {
  var monday = getMonday(new Date()).getTime();

  let usersArr = await getRank(monday);
  if (usersArr.length) {
    usersArr.forEach((item, index) => {
      item["rank"] = index;
    });
    ctx.body = {
      code: 200,
      msg: "获取本周所有用户时长成功",
      usersArr,
    };
  } else {
    ctx.body = {
      code: 300,
      msg: "本周还没有用户学习",
    };
  }
};
//获取所有用户学习总时长
const getAlluserTime = async (ctx) => {
  let usersArr = await Time.aggregate([
    {
      $group: {
        _id: "$username",
        totalWeekTime: {
          $sum: "$timeStamp",
        },
      },
    },
    {
      $sort: {
        totalWeekTime: -1,
      },
    },
  ]);
  if (usersArr.length) {
    ctx.body = {
      code: 200,
      msg: "获取所有用户总时长成功",
      usersArr,
    };
  } else {
    ctx.body = {
      code: 300,
      msg: "还没有用户开始学习",
    };
  }
};
//获取所有用户本月学习时长
const getAllUserMonthTime = async (ctx) => {
  let monthFirstDay = getMonthFirstDay().getTime();
  let usersArr = await getRank(monthFirstDay);
  if (usersArr.length) {
    ctx.body = {
      code: 200,
      msg: "获取本月所有用户时长成功",
      usersArr,
    };
  } else {
    ctx.body = {
      code: 300,
      msg: "本月还没有用户学习",
    };
  }
};

//获取用户一周内学习时间的分布
const getUserEverydayTime = async (ctx) => {
  let { username } = ctx.query;
  let monday = getMonday(new Date()).getTime();
  await Time.find({ username, endTime: { $gte: monday } })
    .then((res) => {
      if (res) {
        //获取一周内每天的起始时间和结束时间
        const result = getTimeInterval(7,res,getEveryWeekTimePart)
        console.log(result);
        ctx.body = {
          code: 200,
          mag: "获取用户本周学习时长分布完成",
          data: result,
        };
      } else {
        ctx.body = {
          code: 300,
          mag: "本周还没有开始学习",
        };
      }
    })
    .catch((err) => {
      ctx.body = {
        code: 500,
        msg: "服务端错误",
        err,
      };
    });
};
//获取用户一天内时间分布
const getUserTodayTime = async (ctx) => {
  let { username } = ctx.query;
  let todayStart = getTodayStart();
  await Time.find({ username, endTime: { $gte: todayStart } })
    .then((res) => {
      if (res) {
        //获取今天内每两个小时的起始时间和结束时间戳
        const result = getTimeInterval(12,res,getEveryHoursTimePart)
        // console.log(result);
        ctx.body = {
          code: 200,
          msg: "获取用户当天时长分布成功",
          data:result
        };
      }
      else{
        ctx.body = {
          code: 300,
          msg: "今天还没开始学习",
        };
      }
    })
    .catch((err) => {
      ctx.body = {
        code: 500,
        msg: "服务端错误",
        err,
      };
    });
};
module.exports = {
  upload,
  getWeek,
  getAllUserWeekTime,
  getAlluserTime,
  getAllUserMonthTime,
  getUserEverydayTime,
  getUserTodayTime
};

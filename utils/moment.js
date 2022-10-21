var moment = require('moment');
moment.updateLocale("zh-cn", {
  week: {
    dow: 1,
  },
});

//获取一周内每天的起始时间戳和结束时间戳
const getEveryWeekTimePart = (step) => { 
  const day = moment().startOf("week").add(step, "day");
  const weekStartStamp = day.valueOf();
  const weekEndStamp = day.endOf("day").valueOf();
  return [weekStartStamp, weekEndStamp];
};

//当天的开始时间戳
const getTodayStart = () => {
  return moment().startOf("day").valueOf()
}

//获取当天每两个小时的开始时间戳和结束时间戳
const getEveryHoursTimePart = (step) => {
  const hour = moment().startOf("day").add(step * 2, "hour");
  const hoursStartStamp = hour.valueOf();
  const hoursEndStamp = hour.add(2, "hour").subtract(1, "second").valueOf();
  return [hoursStartStamp, hoursEndStamp];
};
module.exports =  {
  getEveryWeekTimePart,
  getTodayStart,
  getEveryHoursTimePart
};

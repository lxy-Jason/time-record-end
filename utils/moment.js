var moment = require('moment');
moment.updateLocale("zh-cn", {
  week: {
    dow: 1,
  },
});

const getEveryWeekTimePart = (step) => {
  const day = moment().startOf("week").add(step, "day");
  const weekStartStamp = day.valueOf();
  const weekEndStamp = day.endOf("day").valueOf();
  return [weekStartStamp, weekEndStamp];
};

module.exports =  {
  getEveryWeekTimePart
};

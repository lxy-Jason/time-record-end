function getMonday(date){
  var day=date.getDay();
  var deltaDay;
  if (day==0){
      deltaDay=6;
  } else{
      deltaDay=day-1;
  }
  var monday =new Date(date.getTime()-deltaDay*24*60*60*1000);
  monday.setHours(0);
  monday.setMinutes(0);
  monday.setSeconds(0);
  return monday;  //返回本周的周一的0时0分0秒
}
module.exports = getMonday
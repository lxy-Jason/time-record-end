const tiemFormat = require('./timeFormat')

const getWeekTime = (arr) => {
  let hours = 0;
  let minutes = 0;
  let seconds = 0;
  arr.forEach(item => {
    let temp = item.time.split(':')
    hours += Number(temp[0])
    minutes += Number(temp[1])
    seconds += Number(temp[2])
  })
  hours += Math.floor(minutes / 60)
  minutes += Math.floor(seconds / 60)
  minutes = minutes % 60
  seconds = seconds % 60
  return tiemFormat(hours, minutes,seconds)
}
module.exports = getWeekTime
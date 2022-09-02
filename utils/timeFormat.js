module.exports = tiemFormat = (hour = 0,minute = 0,second = 0) => {
  return `${hour < 10 ? '0' + hour : hour}:${minute < 10 ? '0' + minute : minute}:${second < 10 ? '0' + second : second}`
}
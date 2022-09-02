const mongoose = require('mongoose')

//总时间对象
let schema = new mongoose.Schema({
  username:String,
  time:String,
  startTime:String,
  endTime:String
})
const Time = mongoose.model('time',schema)

module.exports = Time
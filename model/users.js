const mongoose = require('mongoose')

//用户对象
let schema = new mongoose.Schema({
  username:String,
  password:String,
  portrait:String
})

const Users = mongoose.model('users',schema)

module.exports = Users
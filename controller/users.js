const Users = require('../model/users')
let jwt = require('jsonwebtoken')

//用户登录
const login = async ctx => {
  let {username,password} = ctx.request.body
  await Users.findOne({username,password}).then(rel => {
    if(rel){
      let token = jwt.sign(
        {username: rel.username},
        'time-record-server-jwt',
        {expiresIn:3600 * 24 * 30}
      )
      ctx.body = {
        code:200,
        msg:'登录成功',
        username,
        token
      }
    }
    else{
      ctx.body = {
        code:406,
        msg:'用户名或密码错误'
      }
    }
  }).catch(err => {
    ctx.body = {
      code:500,
      msg:'服务端错误,登录异常',
      err
    }
  })
}

//用户注册
const register = async ctx => {
  let {username,password} = ctx.request.body
  let isDouble = false

  await Users.findOne({username}).then(rel => {
    if(rel) isDouble = true  
  })
  if(isDouble){
    ctx.body = {
      code:406,
      msg:'用户已存在'
    }
    return
  }

  await Users.create({username,password}).then(rel => {
    if(rel){
      let token = jwt.sign(
        {username: rel.username},
        'time-record-server-jwt',
        {expiresIn:3600 * 24 * 30}
      )
      ctx.body = {
        code:201,
        msg:'注册成功',
        username,
        token
      }
    }
    else{
      ctx.body = {
        code:406,
        msg:'注册失败'
      }
    }
  }).catch(err => {
    ctx.body = {
      code:500,
      msg:'服务器错误,注册失败',
      err
    }
  })
}

module.exports = {
  login,
  register
}
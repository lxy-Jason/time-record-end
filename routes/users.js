const router = require('koa-router')()
const {login,register,usernameUpdate} = require('../controller/users')
router.prefix('/users')

//用户登录
router.post('/login',login)

//用户注册
router.post('/register',register)

//修改用户名
router.post('/usernameUpdate',usernameUpdate)

module.exports = router

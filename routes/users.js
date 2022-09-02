const router = require('koa-router')()
const {login,register} = require('../controller/users')
router.prefix('/users')

//用户登录
router.post('/login',login)

//用户注册
router.post('/register',register)

module.exports = router

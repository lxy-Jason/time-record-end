const router = require('koa-router')()
const {upload,getWeek,getAllUserWeekTime} = require('../controller/time')
router.prefix('/time')

//时间上传
router.post('/upload',upload)
//获取本周学习时长
router.get('/getWeek',getWeek)
//获取所有用户本周学习时间
router.get('/getAllUserWeekTime',getAllUserWeekTime)

module.exports = router
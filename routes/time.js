const router = require('koa-router')()
const {upload,getWeek,getAllUserWeekTime,getTotalTime,getAllUserMonthTime} = require('../controller/time')
router.prefix('/time')

//时间上传
router.post('/upload',upload)
//获取本周学习时长
router.get('/getWeek',getWeek)
//获取所有用户本周学习时间
router.get('/getAllUserWeekTime',getAllUserWeekTime)
//获取所有用户学习总时长
router.get('/getTotalTime',getTotalTime)
//获取所有用户本月学习时长
router.get('/getAllUserMonthTime',getAllUserMonthTime)

module.exports = router
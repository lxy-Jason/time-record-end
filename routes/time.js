const router = require('koa-router')()
const {upload,getWeek,getAllUserWeekTime,getAlluserTime,getAllUserMonthTime,getUserEverydayTime,getUserTodayTime} = require('../controller/time')
router.prefix('/time')

//时间上传
router.post('/upload',upload)
//获取本周学习时长
router.get('/getWeek',getWeek)
//获取所有用户本周学习时间
router.get('/getAllUserWeekTime',getAllUserWeekTime)
//获取所有用户学习总时长
router.get('/getTotalTime',getAlluserTime)
//获取所有用户本月学习时长
router.get('/getAllUserMonthTime',getAllUserMonthTime)
//获取用户本周时长分布
router.get('/getUserEverydayTime',getUserEverydayTime)
//获取用户当天学习时长分布
router.get("/getUserTodayTime",getUserTodayTime)
module.exports = router
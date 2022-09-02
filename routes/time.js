const router = require('koa-router')()
const {upload,getWeek} = require('../controller/time')
router.prefix('/time')

//时间上传
router.post('/upload',upload)
//获取本周学习时长
router.get('/getWeek',getWeek)


module.exports = router
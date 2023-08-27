/*
 * @Author: xiangyue_li
 * @Date: 2023-08-27 15:07:17
 * @LastEditors: xiangyue_li
 */
const mongoose = require('mongoose');

main().then(() => {
  console.log('数据库连接成功');
})
.catch(err =>console.log('数据库连接失败',err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/time-record'); //用localhost连不上,得用127.0.0.1
}

module.exports = main
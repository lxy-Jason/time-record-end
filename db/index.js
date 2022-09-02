const mongoose = require('mongoose');

main().then(() => {
  console.log('数据库连接成功');
})
.catch(err =>console.log('数据库连接失败',err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/time-record');
}

module.exports = main

const Time = require('../model/time')

const getRank = async(time) => {
  let usersArr = await Time.aggregate([
    {
      '$match': {
        'endTime': {
          '$gte': time
        }
      }
    }, {
      '$group': {
        '_id': '$username',
        'totalWeekTime': {
          '$sum': '$timeStamp'
        }
      }
    }, {
      '$sort': {
        'totalWeekTime': -1
      }
    }
  ])
  return usersArr
}
module.exports = getRank

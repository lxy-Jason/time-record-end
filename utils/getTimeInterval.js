const getTimeInterval = (num, res, fn) => {
  const timeStampArr = Array.from({ length: num }).map((_, i) => [
    i + 1,
    ...fn(i),
  ]);
  const map = new Map();
  for (let i = 0; i < res.length; i++) {
    const { endTime } = res[i];
    const temp = timeStampArr.find(
      (time) => time[1] <= endTime && time[2] >= endTime
    );
    if (temp) {
      if (!map.has(temp[0])) {
        map.set(temp[0], []);
      }
      map.get(temp[0]).push(res[i]);
    }
  }
  const result = Array(num).fill(0);
  for (const [key, value] of map) {
    let dayTimeStamp = value.reduce((pre, val) => pre + val.timeStamp, 0);
    result[key] = dayTimeStamp;
  }
  console.log(result);
  return result;
};
module.exports = getTimeInterval;

function getMonthFirstDay() {
  let today = new Date();
  today.setDate(1);
  today.setHours(0, 0, 0, 0);
  return today;
}

module.exports = getMonthFirstDay
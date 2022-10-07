function generateTimeRemining(now, down) {
  let timeReminingObject = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };
  let timeRemining = down - now;

  let oneDay = 1000 * 60 * 60 * 24;
  let oneHour = 1000 * 60 * 60;
  let oneMinute = 1000 * 60;
  let oneSecond = 1000;

  let days = Math.floor(timeRemining / oneDay);
  let hours = Math.floor((timeRemining % oneDay) / oneHour);
  let minutes = Math.floor((timeRemining % oneHour) / oneMinute);
  let seconds = Math.floor((timeRemining % oneMinute) / oneSecond);
  timeReminingObject.days = days;
  timeReminingObject.hours = hours;
  timeReminingObject.minutes = minutes;
  timeReminingObject.seconds = seconds;
  return timeReminingObject;
}

module.exports = generateTimeRemining;
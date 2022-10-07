const express = require("express");
const { DBConnection } = require("../../assist/DBConnection");
const router = express.Router();
const db = DBConnection.connect();
const generateTimeRemining = require("../../assist/generateTimeRemining");

let responseData = {
  message: "",
  data: [],
  hasError: false,
};

router.post("/", (req, res) => {
  let id = parseInt(req.body.id);
  let getAll = req.body.getAll;  

  let command = `SELECT * FROM notification WHERE UserID = ${id} ORDER BY Date DESC LIMIT 10`;
  if (getAll === true)
    command = `SELECT * FROM notification WHERE UserID = ${id} ORDER BY Date DESC`;
  

  db.query(command, (err, result, fields) => {
    if (err) {
      printError(err.message, res);
      return;
    }
    let notifications = "[";
    result.forEach((notification) => {
      let notid = notification.ID;
      let description = notification.Text;
      let from = notification.Sender;
      let isRead = notification.IsRead === 0 ? false : true;

      let d = Date.parse(notification.Date.toString());
      let now = new Date().getTime();
      let left = generateTimeRemining(d, now);
      let days = left.days;
      let daysS = days * 86400;
      let hours = left.hours;
      let hoursS = hours * 3600;
      let minutes = left.minutes;
      let minutesS = minutes * 60;

      let max = Math.max(daysS, hoursS, minutesS);
      let time = "";
      if (days === 0 && hours === 0 && minutes === 0) time = "Just Now";
      else if (max === minutesS) time = `${minutes}m`;
      else if (max === hoursS) time = `${hours}h`;
      else if (max === daysS) time = `${days}d`;
      notifications += `{"id": ${notid}, "from": "${from}", "description": "${description}", "isRead": ${isRead}, "time": "${time}" },`;
    });
    notifications = notifications.replace(/.$/, "]");
    if (notifications === "]") notifications = JSON.stringify([]);
    res.send(notifications);
  });
});

function printError(message, res) {
  responseData.message = message;
  responseData.hasError = true;
  res.send(responseData);
}
module.exports = router;

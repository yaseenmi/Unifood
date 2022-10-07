const express = require("express");
const { DBConnection } = require("../../assist/DBConnection");
const router = express.Router();
const generateTimeRemining = require("../../assist/generateTimeRemining");

const db = DBConnection.connect();

let responseData = {
  message: "",
  data: [],
  hasError: false,
};

router.post("/", (req, res) => {
  let id = req.body.id;
  let pid = req.body.pid;

  let command = `SELECT r.*, u.Name AS Name, c.IsBanned, c.Image, u.ID AS UserID FROM review r INNER JOIN user u ON r.CustomerID = (SELECT ID from customer WHERE UserID = u.ID) AND r.ProductID = ${pid} INNER JOIN customer c ON r.CustomerID = c.ID ORDER BY r.Date DESC`;

  db.query(command, (err, result) => {
    if (err) {
      printError(err.message, res);
      return;
    }
    for (r of result) {
      let d = Date.parse(r.Date.toString());
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
      r.Date = time;

      
      if (r.UserID === parseInt(id)) r.CanReact = false;
      else r.CanReact = true;
    }    
    res.send(JSON.stringify(result));
  });
});

function printError(message, res) {
  responseData.message = message;
  responseData.hasError = true;
  res.send(responseData);
}

module.exports = router;

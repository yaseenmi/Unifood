const express = require("express");
const router = express.Router();

const { JsonRes } = require("./functions/JsonResponse");
const { DBConnection } = require("../../assist/DBConnection");
const { createTokens, validateToken } = require("./functions/JWT");
const generateTimeRemining = require("../../assist/generateTimeRemining");
const db = DBConnection.connect();

router.post("/", (req, res) => {
  let userID = req.body.userID;
  const fetchNotifications = `SELECT * FROM 
    notification n 
    JOIN \`user\` u 
    ON u.ID = n.UserID 
    JOIN admin a
    ON a.UserID = u.ID 
    AND a.ID = ${userID} 
    ORDER BY Date DESC`;
  db.query(fetchNotifications, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }    
    for (let r of result) {
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
    }
    console.log(result);
    res.send(JSON.stringify(result));
  });
});

router.post("/send", (req, res) => {
  let userID = req.body.UserID;
  let sender = req.body.Sender;
  let text = req.body.Text;

  if (text != "" && text != null && text != undefined) {
    let insertNoti =
      "INSERT INTO notification(Text, IsRead, UserID, Date, Sender) VALUES (?, 0, ?, CURRENT_TIMESTAMP, ?)";

    db.query(insertNoti, [text, userID, sender], (err, result) => {
      if (err) {
        console.log(err);
        return res.json({
          resStatus: "bad",
          resMessage: "*Something went wrong, try again later",
        });
      } else {
        return res.json({
          resStatus: "good",
          resMessage: "Notification sent successfully",
        });
      }
    });
  } else {
    return res.json({
      resStatus: "bad",
      resMessage: "*Feilds cannot be empty",
    });
  }
});

router.post("/count", (req, res) => {
  let userID = req.body.userID;
  const countQuery = `SELECT count(n.ID) As co FROM 
    notification n 
    JOIN \`user\` u 
    ON u.ID = n.UserID 
    JOIN admin a
    ON a.UserID = u.ID 
    WHERE n.IsRead = 0 AND a.ID = ${userID}`;
  db.query(countQuery, (err, result) => {
    if (err) console.log(err);
    else {
      res.json({count: result[0].co.toString()});
    }
  });
});

module.exports = router;

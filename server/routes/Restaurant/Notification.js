// ROUTER
var express = require("express");
const generateTimeRemining = require("../../assist/generateTimeRemining");

var router = express.Router();

// Database Connection
const { DBConnection } = require("../../assist/DBConnection");
const db = DBConnection.connect();

router.get("/get", (req, res) => {
  const restID = req.session.user[0].ID;
  const sqlSelect = `SELECT * FROM notification WHERE UserID = (SELECT UserID from restaurant WHERE ID = ${restID});`;
  db.query(sqlSelect, (err, result) => {
    if (err) {
      console.log(err);
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
    console.log(notifications);
    res.send(notifications);
  });
});

router.get("/count", (req, res) => {
  const restID = req.session.user[0].ID;
  const sqlSelect = `SELECT COUNT(ID) AS Co FROM notification WHERE UserID = (SELECT UserID from restaurant WHERE ID = ${restID}) AND IsRead = 0;`;
  db.query(sqlSelect, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.json({ count: result[0].Co });
  });
});
router.post("/insertDeleteRequest", (req, res) => {
  const restaurantName = req.session.user[0].UserName;
  const description = `delete request from ${restaurantName}`;
  const getAllAdmins = "SELECT UserID FROM admin";
  const restName = req.session.user[0].UserName;
  db.query(getAllAdmins, (err_, result) => {
    if (err_) {
      console.log(err_);
      res.send("Something went wrong!");
      return;
    }
    for (let r of result) {
      const sqlinsert = `INSERT INTO notification(Text, Sender, UserID) VALUES(?,?, ${r.UserID});`;
      db.query(sqlinsert, [description, restName], (err) => {
        if (err) {
          return res.json({
            status: "bad",
            Errormessage: "Something went wrong, try again latter",
          });
        } else {
          return res.json({
            status: "bad",
            Successmessage: "request has been sent",
          });
        }
      });
    }
  });
});
router.post("/insertReportCustomer", (req, res) => {
  const CustomerID = req.body.CustomerID;
  const restaurantName = req.session.user[0].UserName;
  const description = `report request from : ${restaurantName} with Customer ID :${CustomerID}`;
  const getAllAdmins = "SELECT UserID FROM admin";
  db.query(getAllAdmins, (err_, result) => {
    if (err_) {
      console.log(err_);
      res.send("Something went wrong!");
      return;
    }
    for (let r of result) {      
      const sqlinsert = `INSERT INTO notification(Text, Sender, UserID) VALUES(?,?, ${r.UserID});`;
      db.query(sqlinsert, [description, restaurantName], (err) => {
        if (err) {
          return res.json({
            status: "bad",
            Errormessage: "Something went wrong, try again latter",
          });
        } else {
          return res.json({
            status: "bad",
            Successmessage: "request has been sent",
          });
        }
      });
    }
  });
});

router.post("/insertOrderStatus/:idcu", (req, res) => {
  const CustomerID = req.params.idcu;
  const description = req.body.description;
  const isRead = 0;
  console.log("d :" + description);
  const sqlinsert = `INSERT INTO notification(Text, IsRead, UserID, Date) VALUES(?,?,(SELECT UserID FROM customer WHERE ID =${CustomerID}),CURRENT_TIMESTAMP);`;
  db.query(sqlinsert, [description, isRead], (err) => {
    if (err) {
      return res.json({
        status: "bad",
        Errormessage: "Something went wrong, try again latter",
      });
    } else {
      return res.json({
        status: "bad",
        Successmessage: "request has been sent",
      });
    }
  });
});
module.exports = router;

const express = require("express");
const { DBConnection } = require("../../assist/DBConnection");
const router = express.Router();
const db = DBConnection.connect();

let responseData = {
  message: "",
  data: [],
  hasError: false,
};

router.post("/", (req, res) => {
  let id = req.body.id;
  let notid = req.body.notid;
  let isAdmin = req.body.admin;
  let isRestaurant = req.body.restaurant;

  let command = `UPDATE notification SET IsRead = 1 WHERE ID = ${notid} AND UserID = ${id}`;
  if (isAdmin !== undefined && isAdmin !== "" && isAdmin !== null)
    command = `UPDATE notification SET IsRead = 1 WHERE ID = ${notid} AND UserID = (SELECT UserID from admin WHERE ID = ${isAdmin})`;
  if (
    isRestaurant !== undefined &&
    isRestaurant !== "" &&
    isRestaurant !== null
  )
    command = `UPDATE notification SET IsRead = 1 WHERE ID = ${notid} AND UserID = (SELECT UserID from restaurant WHERE ID = ${isRestaurant})`;

  db.query(command, (err, result) => {
    if (err) {
      printError(err.message, res);
      return;
    }
    responseData.message = "Process completed successfully!";
    res.send(responseData);
  });
});

function printError(message, res) {
  responseData.message = message;
  responseData.hasError = true;
  res.send(responseData);
}

module.exports = router;

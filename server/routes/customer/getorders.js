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

  let command = `SELECT * FROM \`order\` WHERE CustomerID = (SELECT ID FROM customer WHERE UserID = ${id}) ORDER BY Date DESC`;

  db.query(command, (err, result) => {
    if (err) {
      printError(err.message, res);
      return;
    }
    res.send(result);
  });
});

function printError(message, res) {
  responseData.message = message;
  responseData.hasError = true;
  res.send(responseData);
}

module.exports = router;

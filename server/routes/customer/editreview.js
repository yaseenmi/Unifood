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
  let text = req.body.text;

  let command = `UPDATE review SET Text = '${text}' WHERE ID = ${id}`;

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

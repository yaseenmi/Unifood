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
  let pid = req.body.pid;

  let command = `SELECT Value FROM rate WHERE CustomerID = (SELECT ID FROM customer WHERE UserID = ${id}) AND ProductID = ${pid}`;

  db.query(command, (err, result) => {
    if (err) {
      printError(err.message, res);
      return;
    }
    if (result.length === 0) {      
      responseData.data = { value: 1 };
      responseData.message = "first";
      res.send(responseData);
      return;
    }    
    responseData.data = { value: result[0].Value };
    responseData.message = "other";
    res.send(responseData);    
  });
});

function printError(message, res) {
  responseData.message = message;
  responseData.hasError = true;
  res.send(responseData);
}

module.exports = router;

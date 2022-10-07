const express = require(`express`);
const { DBConnection } = require(`../../assist/DBConnection`);
const router = express.Router();
const db = DBConnection.connect();

let responseData = {
  message: ``,
  data: [],
  hasError: false,
};

router.post(`/`, (req, res) => {
  let id = req.body.id;
  let pid = req.body.pid;
  let value = req.body.value;

  let command = `SELECT Value FROM rate WHERE CustomerID = (SELECT ID FROM customer WHERE UserID = ${id}) AND ProductID = ${pid}`;

  db.query(command, (err, result) => {
    if (err) {
      printError(err.message, res);
      return;
    }
    if (result.length === 0)
      command = `INSERT INTO rate (Value, CustomerID, ProductID) VALUES (${value}, (SELECT ID From customer WHERE UserID = ${id}), ${pid})`;
    else
      command = `UPDATE rate SET Value = ${value} WHERE CustomerID = (SELECT ID From customer WHERE UserID = ${id})`;
    db.query(command, (err1, result1) => {
      if (err1) {
        printError(err1.message);
        return;
      }      
      responseData.message = `Process completed successfully!`;
      res.send(responseData);
    });
  });
});

function printError(message, res) {
  responseData.message = message;
  responseData.hasError = true;
  res.send(responseData);
}

module.exports = router;

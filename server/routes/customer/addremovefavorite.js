const express = require("express");
const { DBConnection } = require("../../assist/DBConnection");
const router = express.Router();

const db = DBConnection.connect();

let responseData = {
  message: "",
  data: [],
  hasError: false,
};
let restaurants = [];

router.post("/", (req, res) => {
  let productId = req.body.productId;
  let id = req.body.id;
  let process = req.body.process;

  let command = "";

  if (process === "add")
    command = `INSERT INTO favorite (CustomerID, ProductID) VALUES ((SELECT ID FROM Customer WHERE UserID = ${id}), ${productId})`;
  else if (process === "remove")
    command = `DELETE FROM favorite WHERE CustomerID = (SELECT ID FROM Customer WHERE UserID = ${id}) AND ProductID = ${productId}`;
  db.query(command, (err, result, fields) => {
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

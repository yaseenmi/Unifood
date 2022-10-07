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

router.get("/", (req, res) => {
  let command = "SELECT user.Name, restaurant.* FROM restaurant, user WHERE user.ID = restaurant.UserID AND restaurant.IsExist = 1;";  
  db.query(command, (err, result, fields) => {
    if (err) {
      printError(err.message, res);
      return;
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

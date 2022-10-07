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
  let restId = req.body.restId;  
  let command = `SELECT c.* FROM category c, restaurant r WHERE c.RestaurantID = ${restId} AND r.IsExist = 1 && r.ID = ${restId}`;
    if (restId === undefined) command = "SELECT c.*, u.Name AS RestaurantName FROM category c, user u, restaurant r WHERE r.UserID = u.ID AND c.RestaurantID = r.ID AND r.IsExist = 1";
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
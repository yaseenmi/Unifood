const express = require(`express`);
const { DBConnection } = require(`../../assist/DBConnection`);
const router = express.Router();
const db = DBConnection.connect();
const fs = require(`fs`);

let responseData = {
  message: ``,
  data: [],
  hasError: false,
};

router.post(`/`, (req, res) => {
  let id = req.body.id;

  let command = `SELECT * FROM user u, customer c WHERE c.UserID = u.ID AND u.ID = ${id}`;

  db.query(command, (err, result) => {
    if (err) {
      printError(err.message, res);
      return;
    }
    let userData = result[0];
    responseData.data = userData;
    responseData.message = `Process completed successfully!`;
    res.send(responseData);
  });
});

function printError(message, res) {
  responseData.message = message;
  responseData.hasError = true;
  res.send(responseData);
}

module.exports = router;

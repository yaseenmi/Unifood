const express = require("express");
const { DBConnection } = require("../../assist/DBConnection");
const router = express.Router();
const db = DBConnection.connect();
const path = require("path");

let responseData = {
  message: "",
  data: [],
  hasError: false,
};

router.post("/", (req, res) => {
  let id = req.body.id;  
  let img = req.files.img;

  const absoluteImagePath = `./public/images/customers/p${id}${path.extname(
    img.name
  )}`;
  const relativeImagePath = `/images/customers/p${id}${path.extname(img.name)}`;
  const dbPath = `p${id}${path.extname(img.name)}`;
  let command = `UPDATE customer SET Image = '${dbPath}' WHERE UserID = ${id}`;

  img.mv(absoluteImagePath, (err) => {
    if (err) {
      printError(err.message, res);
      return;
    }
    db.query(command, (err, result) => {
      if (err) {
        printError(err.message, res);
        return;
      }
      responseData.message = "Process completed successfully!";
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
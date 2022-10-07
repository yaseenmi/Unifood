const express = require("express");
const { DBConnection } = require("../../assist/DBConnection");
const router = express.Router();
const fs = require("fs");

const db = DBConnection.connect();

let responseData = {
  message: "",
  data: [],
  hasError: false,
};

router.post("/", (req, res) => {
  let id = req.body.id;
  let name = req.body.name;
  let phone = req.body.phone;
  let oldPassword = req.body.oldPassword;
  let newPassword = req.body.newPassword;
  let changePassword = req.body.changePassword;

  let command1 = `UPDATE \`user\` SET Name = '${name}', Phone = ${phone} WHERE ID = ${id}`;
  let command2 = `UPDATE customer SET Password = '${newPassword}' WHERE Password = '${oldPassword}' AND UserID = ${id}`;

  let regIDsPath = "./public/files/RegisteredStudentsIDs.json";

  db.query(command1, (err, result) => {
    if (err) {
      printError(err.message, res);
      return;
    }
    if (changePassword) {
      db.query(command2, (err1, result1) => {
        if (err1) {
          printError(err1.message, res);
          return;
        }
        if (result1.affectedRows === 0) {
          printError(
            "This password is not your old password, please try again later.",
            res
          );
          return;
        }
        fs.readFile(regIDsPath, "utf8", (err2, jsonString) => {
          if (err) {
            printError(err2.message, res);
            return;
          }
          let ids = JSON.parse(jsonString);
          for (el of ids) {
            if (el.UserID === parseInt(id)) el.Password = newPassword;
          }          
          fs.writeFile(regIDsPath, JSON.stringify(ids), (err3) => {
            if (err3) {
              printError(err3.message, res);
              return;
            }
            responseData.hasError = false;
            responseData.message = "Process completed successfully.";
            res.send(responseData);
          });
        });
      });
    } else {
      responseData.hasError = false;
      responseData.message = "Process completed successfully!";
      res.send(responseData);
    }
  });
});

function printError(message, res) {
  responseData.message = message;
  responseData.hasError = true;
  res.send(responseData);
}

module.exports = router;

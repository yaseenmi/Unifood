const express = require("express");
const { DBConnection } = require("../../assist/DBConnection");
const fs = require("fs");
const router = express.Router();
const db = DBConnection.connect();

let responseData = {
  message: "",
  data: null,
  hasError: false,
};

router.post("/", (req, res) => {
  let name = req.body.name;
  let id = parseInt(req.body.id);
  let password = req.body.password;

  let regIDsPath = "./public/files/RegisteredStudentsIDs.json";
  let IDsPath = "./public/files/StudentsIDs.json";

  fs.readFile(regIDsPath, "utf8", (err, jsonString) => {
    if (err) {
      responseData.message =
        "Provided students ID's JSON file is not in the correct format.";
      responseData.hasError = true;
      res.send(responseData);
      return;
    }
    let regIDsAsJSObject = JSON.parse(jsonString);
    let isStudentExist = checkStudentExistential(id, regIDsAsJSObject);
    if (!isStudentExist) {
      fs.readFile(IDsPath, "utf8", (err_, jsonString_) => {
        if (err_) {
          responseData.message =
            "Provided students ID's JSON file is not in the correct format.";
          responseData.hasError = true;
          res.send(responseData);
          return;
        }
        let IDsAsJSObject = JSON.parse(jsonString_);
        let isStudentMember = checkStudentExistential(id, IDsAsJSObject);
        if (isStudentMember) {
          register(id, name, password, regIDsAsJSObject, regIDsPath, res);
        } else {
          responseData.message =
            "You're not a student / stuff in this university!";
          responseData.hasError = true;
          res.send(responseData);
          return;
        }
      });
    } else {
      responseData.message =
        "You're already exist in our system, try to enter now!";
      responseData.hasError = true;
      res.send(responseData);
      return;
    }
  });
});

function checkStudentExistential(id, ids) {
  for (student of ids) {
    if (student.ID === id) return true;
  }
  return false;
}
function register(id, name, password, ids, idsPath, res) {
  const userInsertionCommand = "INSERT INTO user (Name, Phone) VALUES (?, ?)";
  const customerInsertionCommand =
    "INSERT INTO customer (Password, UserID) VALUES (?, ?)";
  const lastIDCommand = "SELECT MAX(ID) AS mx FROM user";
  const passwordCommand = "SELECT Password FROM customer WHERE UserID = ?";

  db.query(userInsertionCommand, [name, 0], (err, result, fields) => {
    if (err) {
      responseData.message = "Something went wronge!";
      responseData.hasError = true;
      res.send(responseData);
      return;
    }

    db.query(lastIDCommand, (err, result, fields) => {
      let lastID = result[0].mx;
      db.query(
        customerInsertionCommand,
        [password, lastID],
        (err_, result_, fields_) => {
          if (err_) {
            responseData.message = "Something went wronge!";
            responseData.hasError = true;
            res.send(responseData);
            return;
          }
          db.query(passwordCommand, [lastID], (err__, result__, fields__) => {
            if (err__) {
              responseData.message = "Something went wronge!";
              responseData.hasError = true;
              res.send(responseData);
              return;
            }
            let lastPassword = result__[0].Password;
            ids.push({ ID: id, Password: lastPassword, UserID: lastID });
            stringIDs = JSON.stringify(ids);
            fs.writeFile(idsPath, stringIDs, (fs_err) => {
              if (fs_err) {
                responseData.message = "Something went wronge!";
                responseData.hasError = true;
                res.send(responseData);
                return;
              }
            });
          });
        }
      );
      responseData.message = "Successfull registeration.";
      responseData.data = `{"userID": ${lastID}}`;
      responseData.hasError = false;
      res.send(responseData);
    });
  });
}
module.exports = router;
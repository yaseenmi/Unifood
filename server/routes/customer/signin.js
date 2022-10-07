const express = require("express");
const fs = require("fs");
const router = express.Router();

let responseData = {
  message: "",
  data: null,
  hasError: false,
};

router.post("/", (req, res) => {
  let id = parseInt(req.body.id);
  let password = req.body.password;
  let regIDsPath = "./public/files/RegisteredStudentsIDs.json";
  fs.readFile(regIDsPath, "utf8", (err, jsonString) => {
    if (err) {
      responseData.message =
        "Provided students ID's JSON file is not in the correct format.";
      responseData.hasError = true;
      res.send(responseData);
      return;
    }
    let regIDsAsJSObject = JSON.parse(jsonString);
    let isExist = checkStudentExistential(id, password, regIDsAsJSObject);
    if (!isExist) {
      responseData.message = "Your 'ID Number' or 'Password' is not correct.";
      responseData.hasError = true;
      res.send(responseData);
      return;
    }
    res.send(responseData);
  });
});

function checkStudentExistential(id, password, ids) {
  for (student of ids) {
    if (student.ID === id && student.Password === password) {
      responseData.message = "Successfull entering.";
      responseData.hasError = false;
      responseData.data = `{"userID": ${student.UserID}}`;
      return true;
    }
  }
  return false;
}

module.exports = router;

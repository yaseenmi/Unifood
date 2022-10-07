const express = require(`express`);
const { DBConnection } = require(`../../assist/DBConnection`);
const router = express.Router();

const db = DBConnection.connect();

let responseData = {
  message: ``,
  data: [],
  hasError: false,
};
let restaurants = [];

router.post(`/`, (req, res) => {    
  let name = req.body.name;
  let command = `SELECT r.*, u.Name FROM restaurant r, user u WHERE LOWER(u.Name) = ? AND u.ID = r.UserID AND r.IsExist = 1`;
  db.query(command, [name], (err, result, fields) => {
    if (err) {
      printError(err.message, res);
      return;
    }
    if(!result[0])
    {
      result[0] = {
        ID: 0,
        Password: `---`,
        Image: `-----`,
        IsClosed: 1,
        IsExist: 0,
        UserID: 0,
        Name: `-----`,
      };
      res.send(JSON.stringify(result[0]));      
      return;
    }
    res.send(JSON.stringify(result[0]));
  });
});

function printError(message, res) {
  responseData.message = message;
  responseData.hasError = true;
  res.send(responseData);
}
module.exports = router;

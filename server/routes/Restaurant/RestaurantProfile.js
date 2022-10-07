// ROUTER
var express = require("express");

var router = express.Router();

// Database Connection
const { DBConnection } = require("../../assist/DBConnection");
const db = DBConnection.connect();

router.get("/get", (req, res) => {
  const restaurantName = req.session.user[0].UserName;
  const restID = req.session.user[0].ID;
  const sqlSelect = `SELECT r.Password,r.Image,r.IsClosed, u.Name AS UserName, u.Phone FROM restaurant r, user u WHERE r.ID = ${restID} and r.UserID = u.ID;`;
  db.query(sqlSelect, (err, result) => {
    if (err) {
      console.log(err);
    }
    return res.json({
      result: result,
      restName: restaurantName,
      restID: restID,
    });
  });
});
router.get("/getPassword", (req, res) => {
  const restID = req.session.user[0].ID;
  const sqlSelect = `SELECT Password FROM restaurant  WHERE ID = ${restID};`;
  db.query(sqlSelect, (err, result) => {
    if (err) {
      console.log(err);
    }
    return res.send(result);
  });
});
router.put("/edit", (req, res) => {
  const restID = req.session.user[0].ID;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;
  const update =
    "UPDATE restaurant SET Password =? WHERE Password = ? and ID =? ";
  db.query(update, [newPassword, oldPassword, restID], (err) => {
    if (err) {
      console.log(err);
      return res.json({
        PasswordErrormessage:
          "Something went wrong, please fill all the records",
      });
    } else {
      return res.json({
        PasswordSuccessmessage: "Password have been changed",
      });
    }
  });
});

router.put("/editIsClosed", (req, res) => {
  const restID = req.session.user[0].ID;
  const IsClosed = !parseInt(req.body.IsClosed) === false ? 0 : 1;

  const update = "UPDATE restaurant SET IsClosed =? WHERE ID =? ";
  db.query(update, [IsClosed, restID], (err) => {
    if (err) {
      console.log(err);
      return res.json({
        StatusErrormessage: "Something went wrong, please fill all the records",
      });
    } else {
      return res.json({
        StatusSuccessmessage: "Status have been changed",
      });
    }
  });
});
router.put("/editGeneral", (req, res) => {
  const restID = req.session.user[0].ID;
  const username = req.body.username;
  const phone = req.body.phone;
  console.log("username: " + username);
  console.log("phone: " + phone);
  const update = `UPDATE user SET Name =? , Phone = ? WHERE ID=(SELECT r.UserID FROM restaurant r WHERE r.ID =${restID});`;
  db.query(update, [username, phone], (err) => {
    if (err) {
      console.log(err);
      return res.json({
        GeneralErrormessage:
          "Something went wrong, please fill all the records",
      });
    } else {
      return res.json({
        GeneralSuccessmessage: "Information have been changed",
      });
    }
  });
});

router.put("/editImage", (req, res) => {
  const restaurantName = req.session.user[0].UserName;
  const restID = req.session.user[0].ID;
  const image = req.files.image;
  const update = "UPDATE restaurant SET Image =? WHERE ID =? ";
  db.query(update, [image.name, restID], (err, result) => {
    if (err) {
      console.log(err);
      return res.json({
        ImageErrormessage: "Something went wrong, please select your image",
      });
    } else {
      return res.json({
        ImageSuccessmessage: "Image have been changed",
      });
    }
  });
  image.mv(
    `public/images/restaurants-images/${image.name}`,
    (err) => {
      if (err) {
        console.error(err);
      }
    }
  );
});
module.exports = router;

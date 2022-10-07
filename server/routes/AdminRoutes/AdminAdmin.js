const express = require("express");
const router = express.Router();

const { isEquale } = require("./functions/Validator");
const { JsonRes } = require("./functions/JsonResponse");
const { DBConnection } = require("../../assist/DBConnection");
const db = DBConnection.connect();

// File Stream
const fs = require("fs");

router.get("/stat/users", (req, res) => {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth()).padStart(2, "0");
  let yyyy = today.getFullYear();
  today = yyyy + "-" + mm + "-" + dd + " 00:00:00";

  let activeUsers = 0;
  let inActiveUsers = 0;
  let uniUsers = 0;
  let unRegUsers = 0;
  let users = 0;

  fs.readFile("public/files/StudentsIDs.json", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      let usersJson = JSON.parse(data);
      usersJson.map(() => {
        uniUsers++;
      });
      let getActiveUsers =
        'SELECT count(DISTINCT c.ID) as counter FROM customer c JOIN `order` o on c.ID = o.CustomerID WHERE o.Date BETWEEN "' +
        today +
        '" AND CURRENT_TIMESTAMP';
      db.query(getActiveUsers, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          activeUsers = result[0].counter;
          let getAllUsers = "SELECT count(ID) as counter FROM customer";
          db.query(getAllUsers, (err, result2) => {
            if (err) {
              console.log(err);
            } else {
              users = result2[0].counter;
              inActiveUsers = users - activeUsers;
              unRegUsers = uniUsers - users;

              return res.json({
                active: (activeUsers / uniUsers) * 100,
                inactive: (inActiveUsers / uniUsers) * 100,
                unRegistered: (unRegUsers / uniUsers) * 100,
                userCounter: activeUsers + inActiveUsers,
              });
            }
          });
        }
      });
    }
  });
});

router.get("/stat/rest", (req, res) => {
  let getRests =
    "SELECT u.Name FROM restaurant r JOIN `user` u ON u.ID = r.UserID";
  let data = [];
  let i = 1;
  db.query(getRests, (err, result) => {
    if (err) console.log(err);
    else {
      result.map((item) => {
        let query =
          'SELECT COUNT(o.ID) as counter FROM `order` o JOIN order_item oi ON o.ID = oi.OrderID JOIN product p ON p.ID = oi.ProductID JOIN category ca ON ca.ID = p.CategoryID JOIN restaurant r ON r.ID = ca.RestaurantID JOIN `user` u ON u.ID = r.UserID WHERE u.Name = "' +
          item.Name +
          '"';
        db.query(query, (err, result2) => {
          if (err) console.log(err);
          else {
            let obj = [];
            data.push({ name: item.Name, value: result2[0].counter });
          }
          if (i == result.length)
            db.query(
              "SELECT COUNT(ID) as counter FROM `order`",
              (err, result) => {
                if (err) console.log(err);
                else {
                  return res.json({
                    orderCounter: result[0].counter,
                    restData: data,
                  });
                }
              }
            );
          else i++;
        });
      });
    }
  });
});

router.post("/login", async (req, res) => {
  const id = req.body.id;
  const password = req.body.password;

  const fecthUsersQuery = "SELECT id, password FROM admin";
  db.query(fecthUsersQuery, (err, results) => {
    if (err) {
      return JsonRes("bad", "Something went wrong, try again later", res);
    }
    for (let user of results) {
      if (isEquale(id, user.id) && isEquale(password, user.password)) {
        return res.json({
          id: id,
          message: "login success",
          status: "good",
        });
      } else {
        return JsonRes("bad", "*User or password is not correct", res);
      }
    }
  });
});

module.exports = router;

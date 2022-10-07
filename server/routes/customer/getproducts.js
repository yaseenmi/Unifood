const { json } = require("body-parser");
const express = require("express");
const { DBConnection } = require("../../assist/DBConnection");
const router = express.Router();

const db = DBConnection.connect();

let responseData = {
  message: "",
  data: [],
  hasError: false,
};
let products = [];

router.post("/", (req, res) => {
  // Get Request Data------------------------------------
  let id = req.body.id;
  let restId = req.body.restId;
  let category = req.body.category;
  let getAll = req.body.getAll;
  let ignorRestaurant = req.body.ignorRestaurant;

  // SQL Statements------------------------------------
  let categoryIdCommand = `SELECT ID FROM category WHERE Name = LOWER('${category}') AND RestaurantID = ${restId}`;
  let productsCommand = `SELECT p.* FROM product p, restaurant r WHERE p.CategoryID = ? AND r.IsExist = 1 AND r.ID = ${restId}`;
  if (getAll) {
    categoryIdCommand = "SELECT ID FROM category";
    productsCommand = `SELECT p.* FROM product p, restaurant r WHERE p.CategoryID IN (SELECT ID FROM category WHERE RestaurantID = ${restId}) AND r.IsExist = 1 AND r.ID = ${restId}`;
  }
  if (ignorRestaurant) {
    productsCommand = "SELECT p.*, u.Name AS RestaurantName, c.Name AS CategoryName FROM product p, category c, user u, restaurant r WHERE r.UserID = u.ID AND c.RestaurantID = r.ID and p.CategoryID = c.ID AND r.IsExist = 1";
  }
  let customerIdCommand = `SELECT ID FROM customer WHERE UserID = ${id}`;
  let favoritesCommand = "SELECT ProductID FROM favorite WHERE CustomerID = ?";
  let rateCommand = "SELECT AVG(Value) AS A FROM rate WHERE ProductID = ?";
  let offerCommand =
    "SELECT Description, Discount AS Percentage FROM offer WHERE ProductID = ?";

  // DB Queries Methods------------------------------------
  db.query(categoryIdCommand, (err1, result1) => {
    if (err1) {
      printError(err1.message, res);
      return;
    } else if (result1[0] === undefined && !getAll) {
      res.send(JSON.stringify([]));
      return;
    }
    let someId = null;
    if (!getAll) someId = result1[0].ID;
    else someId = restId;
    db.query(productsCommand, [someId], (err, result, fields) => {
      if (err) {
        printError(err.message, res);
        return;
      }
      db.query(customerIdCommand, (err_, result_, fields_) => {
        if (err_) {
          printError(err_.message, res);
          return;
        }
        let customerId = result_[0].ID;
        db.query(
          favoritesCommand,
          [customerId],
          (err__, result__, fields__) => {
            if (err__) {
              printError(err__.message, res);
              return;
            }
            products = result;
            for (fav of result__) {
              let i = 0;
              for (prod of result) {
                if (
                  prod.ID === fav.ProductID ||
                  ("IsFavorite" in products[i] && !products[i].IsFavorite)
                ) {
                  products[i].IsFavorite = true;
                }
                i++;
              }
            }
            let newProducts = [];
            newProducts.push(
              products.map((prod, i) => {
                let now = new Date();
                let creationDate = new Date(prod.CreationDate);
                let elapsedWeeks = Math.abs(weeksBetween(now, creationDate));
                if (elapsedWeeks <= 1) prod.IsNew = true;
                else prod.IsNew = false;
                if (!("IsFavorite" in prod)) prod.IsFavorite = false;
                db.query(rateCommand, [prod.ID], (err2, result2) => {                  
                  let roundedRate = Math.round(result2[0].A);
                  products[i].Rate = roundedRate !== 0 ? roundedRate : 1;
                  db.query(offerCommand, [prod.ID], (err3, result3) => {
                    let r3 = result3[0];
                    products[i].HasOffer = r3 !== undefined ? true : false;
                    products[i].OfferDescription =
                      r3 !== undefined ? r3.Description : null;
                    products[i].OfferPercentage =
                      r3 !== undefined ? r3.Percentage : null;                      
                    if (i === products.length - 1) {
                      res.send(JSON.stringify(newProducts[0]));
                    }
                  });
                });
                return products[i];
              })
            );
          }
        );
      });
    });
  });
});
function weeksBetween(d1, d2) {
  return Math.round((d2 - d1) / (7 * 24 * 60 * 60 * 1000));
}
function printError(message, res) {
  responseData.message = message;
  responseData.hasError = true;
  res.send(responseData);
}
module.exports = router;

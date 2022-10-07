const express = require(`express`);
const { DBConnection } = require(`../../assist/DBConnection`);
const router = express.Router();

const db = DBConnection.connect();

let responseData = {
  message: ``,
  data: [],
  hasError: false,
};

router.post(`/`, (req, res) => {
  let id = req.body.id;
  let total = req.body.total;
  let note = req.body.note;
  let ids = req.body.ids;

  const orderCommand = `INSERT INTO \`order\` (TotalPrice, Note, Status, CustomerID) VALUES (${total}, '${note}', 'pending', (SELECT ID FROM customer WHERE UserID = ${id}))`;
  const productAvailabilityCommand = `SELECT p.IsAvailable, r.IsExist FROM product p, restaurant r WHERE p.ID = ? AND r.ID = (SELECT RestaurantID FROM category WHERE ID = p.CategoryID)`;
  const lastOrderIdCommand = `SELECT MAX(ID) AS max FROM \`order\``;
  const itemsCommand = `INSERT INTO order_item (ProductName, Amount, Price, ProductID, OrderID) VALUES (?, ?, ?, ?, ?)`;
  const sendNotificationCommand = `INSERT INTO notification (Text, Sender, UserID) VALUES (?, 'System', ${id})`;

  db.query(orderCommand, (err, result) => {
    if (err) {
      printError(err.message, res);
      return;
    }
    db.query(lastOrderIdCommand, (err1, result1) => {
      if (err1) {
        printError(err1.message, res);
        return;
      }
      let lastId = result1[0].max;
      ids.forEach((ID) => {
        db.query(productAvailabilityCommand, [ID.id], (err2, result2) => {
          if (err2) {
            printError(err2.message, res);
            return;
          }
          let isAvailable = result2[0].IsAvailable;
          let isExist = result2[0].IsExist;
          if (isExist === 1) {
            if (isAvailable === 1) {
              db.query(
                itemsCommand,
                [ID.name, ID.count, ID.price, ID.id, lastId],
                (err3, result3) => {
                  if (err3) {
                    printError(err3.message, res);
                    return;
                  }
                }
              );
            } else {
              let message = `Unfortunately, the product '${ID.name}' from your last order is currently unavailable.`;
              db.query(sendNotificationCommand, [message], (err3, result3) => {
                if (err3) {
                  printError(err3.message, res);
                  return;
                }
              });
            }
          } else {
            let message = `Unfortunately, the product '${ID.name}' does no longer exists.`;
            db.query(sendNotificationCommand, [message], (err3, result3) => {
              if (err3) {
                printError(err3.message, res);
                return;
              }
            });
          }
        });
      });
      responseData.message = `Process completed successfully!`;
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

// ROUTER
var express = require("express")

var router = express.Router()

// Database Connection
const {DBConnection} = require("../../assist/DBConnection")
const db =DBConnection.connect();

router.get('/get',(req,res)=>{
  const restID =req.session.user[0].ID;
  const sqlSelect = `SELECT r.Text, r.Date, r.Like, r.Dislike, r.CustomerID, r.ProductID, p.ID AS ProductID, p.Name, c.ID, c.UserID,c.Image, u.ID, u.Name AS UserName FROM review r, product p, customer c, user u, category ca WHERE p.CategoryID = ca.ID and ca.RestaurantID =${restID} and r.CustomerID = c.ID and r.ProductID = p.ID and c.UserID = u.ID GROUP BY r.ID;`
    db.query(sqlSelect,(err,result)=>{
      if(err){
        console.log(err);
        }
        return res.send(result);
      })
})

module.exports = router;

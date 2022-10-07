// ROUTER
var express = require("express")

var router = express.Router()

// Database Connection
const {DBConnection} = require("../../assist/DBConnection")
const db =DBConnection.connect();

router.get('/get',(req,res)=>{
    const restID=req.session.user[0].ID;
    const sqlSelect = "SELECT o.ID AS OID, o.TotalPrice, o.Date, o.Note, o.Status, o.CustomerID,c.UserID ,c.ID ,u.ID ,u.Name AS UserName FROM \`order\` o, order_item i,product p,category ca ,customer c ,user u WHERE o.ID = i.OrderID and i.productID = p.ID and p.CategoryID =ca.ID and ca.RestaurantID = ? and o.CustomerID = c.ID and c.UserID = u.ID GROUP BY o.ID ORDER BY o.Date DESC"
    db.query(sqlSelect,restID,(err,result)=>{
      if(err){
        console.log(err);
        }
        return res.send(result);
      })
})

router.get('/getTotalPrice',(req,res)=>{
  const restID=req.session.user[0].ID;
  const sqlSelect = "SELECT o.TotalPrice FROM \`order\` o , category c,product p,order_item i WHERE o.ID = i.OrderID and i.productID = p.ID and p.CategoryID =c.ID and c.RestaurantID =? and o.Status = 'delivered' GROUP BY o.ID;"
  db.query(sqlSelect,restID,(err,result)=>{
    if(err){
      console.log(err);
      }
      return res.send(result);
    })
})

router.post('/getLessOrder',(req,res)=>{
  const restID=req.session.user[0].ID;
  let index = req.body.index;
  if (index === 0){ 
    const sqlSelect = "SELECT o.ProductName, SUM(DISTINCT o.Amount) As total FROM order_item o, restaurant r ,\`order\` e ,category c,product p WHERE e.ID = o.OrderID and o.ProductID = p.ID and p.CategoryID = c.ID and r.ID =? and r.ID = c.RestaurantID and e.Status='delivered' GROUP BY o.ProductName ORDER BY SUM(o.Amount) ASC LIMIT 10;"
    db.query(sqlSelect,restID,(err,result)=>{
    if(err){
      console.log(err);
      }
      return res.send(result);
    })
  }
  else{
    const sqlSelect = `SELECT o.ProductName, SUM(DISTINCT o.Amount) As total FROM \`order\` d, order_item o, restaurant r,category c,product p WHERE o.ProductID = p.ID and p.CategoryID = c.ID and d.ID = o.OrderID and MONTH(Date(d.Date)) = ${index} and r.ID = ? and r.ID = c.RestaurantID and d.Status='delivered' GROUP BY o.ProductName ORDER BY SUM(o.Amount) ASC LIMIT 10;`
    db.query(sqlSelect,restID,(err,result)=>{
      if(err){
        console.log(err);
        }
        return res.send(result);
      })
  }
})


router.post('/getMostOrder',(req,res)=>{
  const restID=req.session.user[0].ID;
  let index = req.body.index;
  if (index === 0){ 
    const sqlSelect = "SELECT o.ProductName, SUM(DISTINCT o.Amount) As total FROM order_item o, restaurant r ,\`order\` e ,category c,product p WHERE e.ID = o.OrderID and o.ProductID = p.ID and p.CategoryID = c.ID and r.ID =? and r.ID = c.RestaurantID and e.Status='delivered' GROUP BY o.ProductName ORDER BY SUM(o.Amount) DESC LIMIT 10;"
  db.query(sqlSelect,restID,(err,result)=>{
    if(err){
      console.log(err);
      }
      return res.send(result);
    })
  }
  else{
    const sqlSelect = `SELECT o.ProductName, SUM(DISTINCT o.Amount) As total FROM \`order\` d, order_item o, restaurant r,category c,product p WHERE o.ProductID = p.ID and p.CategoryID = c.ID and d.ID = o.OrderID and MONTH(Date(d.Date)) = ${index} and r.ID = ? and r.ID = c.RestaurantID and d.Status='delivered' GROUP BY o.ProductName ORDER BY SUM(o.Amount) DESC LIMIT 10;`
    db.query(sqlSelect,restID,(err,result)=>{
      if(err){
        console.log(err);
        }
        return res.send(result);
      })
  }
})


router.get('/getOrder_Detail/:ido',(req,res)=>{
    const restaurantName= req.session.user[0].UserName;
    const ido = req.params.ido;
    console.log("test1 "+ido);
    const sqlSelect = "SELECT o.ID AS OID, o.TotalPrice, o.Note FROM \`order\` o WHERE o.ID= ? ;"
    db.query(sqlSelect,[ido],(err,result)=>{
      if(err){
        console.log(err);
        }
        return res.json({
          result:result,
          restName:restaurantName,
        });
      })
})

router.get('/Product_Name/:ido',(req,res)=>{
    const ido = req.params.ido;
    console.log("test1 "+ido);
    const sqlSelect = "SELECT o.ID AS OID, i.ProductID, i.OrderID, i.ProductName ,i.Amount,i.Price, p.ID AS ProductID FROM \`order\` o, product p, order_item i  WHERE i.ProductID = p.ID and o.ID= ? and o.ID = i.OrderID ;"
    db.query(sqlSelect,[ido],(err,result)=>{
      if(err){
        console.log(err);
        }
        return res.send(result);
      })
})

router.put("/OrderStatus/:ido", (req, res) => {
        const Status = req.body.Status;
        const ido = req.params.ido;
        console.log("id:  "+ido);
        console.log("status:  "+Status);
        const update = "UPDATE \`order\` SET Status = ? WHERE ID = ?;"
             
            db.query(update, [Status,ido], (err) => {  
                if(err){ 
                    return res.json({
                        status: 'bad',
                        message: "Something went wrong, try again latter"
                    }); 
                }   
                else{
                return res.json({
                    message: "order has been accepted", 
                 }); 
                } 
            })
    })

    

module.exports = router;

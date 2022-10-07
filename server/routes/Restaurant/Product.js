// ROUTER
var express = require("express")

var router = express.Router()

// Database Connection
const {DBConnection} = require("../../assist/DBConnection")
const db =DBConnection.connect();

router.get('/get',(req,res)=>{
    const restID=req.session.user[0].ID;
        const restaurantName = req.session.user[0].UserName;
    const sqlSelect = `SELECT p.ID AS ProductID,p.Image AS ProductImage, p.Name , p.Price , p.IsAvailable ,p.CategoryID ,c.ID , c.Name AS CategoryName , c.RestaurantID FROM product p, category c WHERE c.ID = p.CategoryID  and RestaurantID= ${restID} ;`
    db.query(sqlSelect,(err,result)=>{
      if(err){
        console.log(err);
        }
        return res.json({
          result: result,
          restName: restaurantName,
        });
      })
})
router.get('/getProductList',(req,res)=>{
    const restID=req.session.user[0].ID;
    const sqlSelect = `SELECT p.ID AS ProductID, p.Name, p.Description AS ProductDescription From category c,product p WHERE p.CategoryID =c.ID and c.RestaurantID = ${restID}  GROUP BY p.ID;`
    db.query(sqlSelect,(err,result)=>{
      if(err){
        console.log(err);
        }
        return res.send(result);
      })
})

router.get('/getPriceDescription/:ProductID',(req,res)=>{
    const ProductID = req.params.ProductID;
    console.log("ProductID: "+ProductID)
    const sqlSelect = "SELECT Description AS ProductDescription ,Price From product WHERE ID=?;"
    
    db.query(sqlSelect,[ProductID],(err,result)=>{
      if(err){
        console.log(err);
        }
        return res.send(result);
      })
})
router.get('/getProduct_Detail/:idp',(req,res)=>{
    const restaurantName = req.session.user[0].UserName;
    const idp = req.params.idp;
    console.log("test1 "+idp);
    const restID=req.session.user[0].ID;
    const sqlSelect = `SELECT p.ID AS ProductID, p.Name ,p.Description AS ProductDescription ,p.Image AS ProductImage ,p.Price , p.IsAvailable ,p.CategoryID ,c.ID , c.Name AS CategoryName , c.RestaurantID, u.Name AS UserName ,u.ID, re.UserID, re.ID FROM restaurant re, user u,product p,category c WHERE p.CategoryID = c.ID   and c.RestaurantID= ${restID}  and p.ID =? and re.ID =${restID} and re.UserID = u.ID;`
    db.query(sqlSelect,[idp],(err,result)=>{
      if(err){
        console.log(err);
        }
        return res.json({
          result:result,
          restName:restaurantName,
        });
      })
})

router.get('/getProduct_rate/:idp',(req,res)=>{
  const restID=req.session.user[0].ID;
  const idp = req.params.idp;
    console.log("test1 "+idp);
    const sqlSelect = `SELECT r.Value ,r.ProductID, p.ID AS ProductID FROM category c,rate r ,product p WHERE p.ID=? and c.RestaurantID = ${restID} and p.ID = r.ProductID;`
    db.query(sqlSelect,[idp],(err,result)=>{
      if(err){
        console.log(err);
        }
        return res.send(result);
      })
})


// add product Route
router.post("/insert", (req, res) => {
    const restaurantName = req.session.user[0].UserName;
    const category = req.body.category
    const name = req.body.name;
    const desc = req.body.desc;
    const price = req.body.price;
    const image = req.files.image;
    const isAvailable = req.body.isAvailable;
       console.log(req.body.category);
        const insertQuery = "INSERT INTO product(Name, Price, Image, Description, isAvailable, CategoryID) VALUES (?, ?, ?, ?, ?, ?);"
             
        image.mv(`public/images/restaurants/${restaurantName}/products/${image.name}`, err => {
            if (err) {
               console.error(err);
             }
            })
        
            db.query(insertQuery, [name, price, image.name, desc, isAvailable, category], (err) => {  
                if(err){ 
                    return res.json({
                        status: 'bad',
                        Errormessage: "Something went wrong, please fill all the records"
                    }); 
                }
                else{
                    return res.json({
                    fileName: image.name,
                    filePath: `http://localhost:3001/images/restaurants/${restaurantName}/products/${image.name}`,
                    status: 'good',
                    Successmessage: "product have been added Successfully",
                 });  
                }
            })
            
                 
                 
    })

    // edit product Route
router.put("/edit/:idp", (req, res) => {
  const restaurantName = req.session.user[0].UserName;
  const idp = req.params.idp
  const category = req.body.category;
  const name = req.body.name;
  const desc = req.body.desc;
  const price = req.body.price;
  const image = req.files.image;
  const isAvailable = req.body.isAvailable;
  console.log("product id :"+idp)
  console.log("product category :"+category)
  console.log("product name :"+name)
  console.log("product desc :"+desc)
  console.log("product price :"+price)
  console.log("product image :"+image.name)
  console.log("product isAvailable :"+isAvailable)
  const update = "UPDATE product SET Name = ?, Price = ?, Image = ?, IsAvailable = ?, Description = ?, CategoryID = ? WHERE ID = ? ;"
           
      
          db.query(update, [name, price, image.name,isAvailable ,desc, category, idp], (err) => {  
              if(err){ 
                  return res.json({
                      Errormessage: "Something went wrong, please fill all the records"
                  }); 
              }
              else{
              return res.json({
                  fileName: image.name,
                  filePath: `http://localhost:3001/images/restaurants/${restaurantName}/products/${image.name}`,
                  Successmessage: "changes have been saved",
               });  
              }
          })
          image.mv(`public/images/restaurants/${restaurantName}/products/${image.name}`, err => {
            if (err) {
               console.error(err);
             }
            })
          
               
        
  })

router.delete('/delete/:idp', (req, res) => {
  const idp = req.params.idp
  console.log("delete id :" + idp)
const sqlDelete = "DELETE FROM product WHERE ID = ? ;"
db.query(sqlDelete, idp, (err) => {  
  if(err){ 
      console.log(err);
      return res.json({
          Errormessage: "Something went wrong, try again later"
      }); 
  }
  else{
  return res.json({
      Successmessage: "product have been deleted",
   });  
  }
})
})
    module.exports = router;

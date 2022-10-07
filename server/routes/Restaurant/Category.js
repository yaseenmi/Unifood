// ROUTER
var express = require("express")

var router = express.Router()

// Database Connection
const {DBConnection} = require("../../assist/DBConnection")
const db =DBConnection.connect();
router.get('/get',(req,res)=>{
  let restID =req.session.user[0].ID;
    const restaurantName = req.session.user[0].UserName;
  const sqlSelect = `SELECT ID,Name AS CategoryName,Description,Image FROM category WHERE RestaurantID = ${restID};`
    db.query(sqlSelect,(err,result)=>{
      if(err){
        console.log(err);
        }
        return res.json({
          result:result,
          restName:restaurantName,

        });
      })
})

router.get('/getCategory_Detail/:idc',(req,res)=>{
  const restaurantName = req.session.user[0].UserName;
  const idc = req.params.idc
  const restID =req.session.user[0].ID;
  const sqlSelect = `SELECT ID,Name AS CategoryName,Description,Image FROM category WHERE RestaurantID = ${restID} and ID = ?;`
  db.query(sqlSelect,[idc],(err,result)=>{
    if(err){
      console.log(err);
      }
      return res.json({
        result:result,
        restName:restaurantName,
      })
    })
})

router.post("/insert", (req, res) => {
    const name = req.body.name;
    const desc = req.body.desc;
    const image = req.files.image;
    const restaurantName = req.session.user[0].UserName;
    const restID =req.session.user[0].ID;
    const insertQuery = "INSERT INTO category(Name, Description, Image, RestaurantID) VALUES (?, ?, ?, ?);"

    image.mv(`public/images/restaurants/${restaurantName}/categories/${image.name}`, err => {
        if (err) {
           console.error(err);
         }
        })

    db.query(insertQuery, [name, desc, image.name, restID], (err) => {  
        if(err){ 
            return res.json({
                status: 'bad',
                Errormessage: "Something went wrong, please fill all the records"
                
            }); 
        }
    })

         return res.json({
           fileName: image.name,
           filePath: `http://localhost:3001/images/restaurants/${restaurantName}/categories/${image.name}`,
           Successmessage: "Category have been added Successfully"
         });  
        
})

router.put("/edit/:idc", (req, res) => {
  const restaurantName = req.session.user[0].UserName;
  const restID = req.session.user[0].ID;
  const idc = req.params.idc
  const name = req.body.name;
  const desc = req.body.desc;
  const image = req.files.image;
      const update = "UPDATE category SET Name = ?, Description = ?, Image = ? WHERE RestaurantID = ? and ID = ?;"
          db.query(update, [name, desc, image.name,restID,idc], (err) => {  
              if(err){ 
                  return res.json({
                      status: 'bad',
                      Errormessage: "Something went wrong, try again later"
                  }); 
              }
              else{
                return res.json({
                  fileName: image.name,
                  filePath: `http://localhost:3001/images/restaurants/${restaurantName}/categories/${image.name}`,
                  status: 'good',
                  Successmessage: "changes have been saved",
               });  
              }
          })
            image.mv(`public/images/restaurants/${restaurantName}/categories/${image.name}`, err => {
          if (err) {
             console.error(err);
           }
          })
            
               
  })

  router.delete('/delete/:idc', (req, res) => {
    const idc = req.params.idc
    console.log("delete id :" + idc)
  const sqlDelete = "DELETE FROM category WHERE ID = ? ;"
  db.query(sqlDelete, idc, (err) => {  
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

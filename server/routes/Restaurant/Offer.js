var express = require("express")

var router = express.Router()

// Database Connection
const {DBConnection} = require("../../assist/DBConnection")
const db =DBConnection.connect();
router.get('/get',(req,res)=>{
    const restID =req.session.user[0].ID;
    const sqlSelect = `SELECT o.ID AS OfferID, o.Description, o.ProductID, o.Discount, p.ID AS ProductID, p.Price FROM offer o,category c, product p WHERE p.CategoryID =c.ID and c.RestaurantID =${restID} and o.ProductID = p.ID GROUP BY o.ID;`
    db.query(sqlSelect,(err,result)=>{
      if(err){
        console.log(err);
        }
        return res.send(result);
      })
})

router.post("/insert/:idp", (req, res) => {
  const Discount = req.body.Discount;
  const restID =req.session.user[0].ID;
  const Description = req.body.Description;
  const idp= req.params.idp;
  let isExist= false
  console.log("Description:",Description)
    const select = `SELECT o.ProductID FROM offer o,product p,category c WHERE o.ProductID = ${idp} and o.ProductID = p.ID and p.CategoryID = c.ID and c.RestaurantID =${restID}`
        db.query(select,(err,result)=>{
            if(err){
                return res.json({
                    status: 'bad',
                    Errormessage: "Something went wrong, please fill all the records"
                })
            }
            for(let id of result){
                if(idp == id.ProductID){
                    console.log(id.ProductID)
                    isExist = true
                    break;
                }
            }
            if(isExist === true){
                return res.json({ 
                    status: 'bad',
                    Errormessage: "offer is already exist!"
                });
            }
            else{

      const insertQuery = "INSERT INTO offer(Description,Discount,ProductID) VALUES (?,?,?);"
           
          db.query(insertQuery, [Description, Discount, idp], (err) => {  
              if(err){ 
                  return res.json({
                      status: 'bad',
                      Errormessage: "Something went wrong, please fill all the records"
                  }); 
              }
              else{
                  return res.json({
                  status: 'good',
                  Successmessage: "Discount have been added Successfully",
               });  
              }
          })
        }
    })     
  })

  router.post("/insertOffer", (req, res) => {
    const restID =req.session.user[0].ID;
    const Discount = req.body.Discount;
    const Description = req.body.Description;
    const ProductID = req.body.ProductID;
    let isExist= false
    console.log("Discount :"+Discount)
    console.log("Description : "+Description)
    console.log("ProductID: "+ProductID)
        const select = `SELECT o.ProductID FROM offer o,product p,category c WHERE o.ProductID = ${ProductID} and o.ProductID = p.ID and p.CategoryID = c.ID and c.RestaurantID =${restID}`
        db.query(select,(err,result)=>{
            if(err){
                return res.json({
                    status: 'bad',
                    Errormessage: "Something went wrong, please fill all the records"
                })
            }
            for(let id of result){
                if(ProductID == id.ProductID){
                    console.log(id.ProductID)
                    isExist = true
                    break;
                }
            }
            if(isExist === true){
                return res.json({ 
                    status: 'bad',
                    Errormessage: "offer is already exist!"
                });
            }
            else{
            const insertQuery = "INSERT INTO offer(Description,Discount,ProductID) VALUES (?,?,?);"
            db.query(insertQuery, [Description, Discount, ProductID], (err) => {
                if(err){ 
                    return res.json({
                        status: 'bad',
                        Errormessage: "Something went wrong, please fill all the records"
                    }); 
                }
                else{
                    return res.json({
                    status: 'good',
                    Successmessage: "Offer have been added Successfully",
                 });  
                }
            })
        }
        })
        
    })

    router.get('/getOffer_Detail/:idof',(req,res)=>{
        const idof = req.params.idof;
        console.log("test1 "+idof);
        const restID=req.session.user[0].ID;
        const sqlSelect = `SELECT p.Name, p.Price, p.Image AS ProductImage, p.Description AS ProductDescription , o.ID AS OfferID, o.Description, o.ProductID, o.Discount , c.ID, c.Name AS CategoryName,u.Name AS UserName ,u.ID, re.UserID, re.ID FROM restaurant re, user u, product p,category c, offer o WHERE o.ID = ? and p.ID = o.ProductID and p.CategoryID = c.ID  and c.RestaurantID= ${restID} and re.ID =${restID}  and re.UserID = u.ID;`
        db.query(sqlSelect,[idof],(err,result)=>{
          if(err){
            console.log(err);
            }
            return res.send(result);
          })
    })
    router.get('/getOfferRate_Detail/:idof',(req,res)=>{
        const idof = req.params.idof;
        console.log("test1 "+idof);
        const sqlSelect = `SELECT r.Value ,r.ID, r.ProductID, o.ID AS OfferID, o.ProductID FROM rate r, offer o WHERE o.ID = ${idof} and o.ProductID = r.ProductID;`
        db.query(sqlSelect,[idof],(err,result)=>{
          if(err){
            console.log(err);
            }
            return res.send(result);
          })
    })

        router.get('/getOffer_Price/:idof',(req,res)=>{
        const idof = req.params.idof;
        console.log("test1 "+idof);
        const sqlSelect = "SELECT p.Price ,p.ID AS ProductID,  o.ID AS OfferID, o.Description, o.ProductID, o.Discount FROM product p, offer o WHERE o.ID = ? and p.ID = o.ProductID"
        db.query(sqlSelect,[idof],(err,result)=>{
          if(err){
            console.log(err);
            }
            return res.send(result);
          })
    })

    router.put("/editDiscount/:idof", (req, res) => {
        const idof = req.params.idof
        const Discount = req.body.Discount;
        console.log("Offer id :"+idof)
        console.log("Discount :"+Discount)
        const update = "UPDATE offer SET Discount = ? WHERE ID = ? ;"
                db.query(update, [Discount, idof], (err) => {  
                    if(err){ 
                        return res.json({
                            Errormessage: "Something went wrong, please fill all the records"
                        }); 
                    }
                    else{
                    return res.json({
                        Successmessage: "changes have been saved",
                     });  
                    }
                })
                                      
        })

        router.delete('/delete/:idof', (req, res) => {
            const idof = req.params.idof
            console.log("delete id :" + idof)
          const sqlDelete = "DELETE FROM offer WHERE ID = ? ;"
          db.query(sqlDelete, idof, (err) => {  
            if(err){ 
                console.log(err);
                return res.json({
                    Errormessage: "Something went wrong, please fill all the records"
                }); 
            }
            else{
            return res.json({
                Successmessage: "offer has been deleted",
             });  
            }
          })
          })
module.exports = router;
// ROUTER
var express = require("express");
const session = require("express-session");

var router = express.Router()

// Database Connection
const {DBConnection} = require("../../assist/DBConnection")
const db =DBConnection.connect();

// Web Tokens
const createTokens = require("./../../node_modules/jsonwebtoken")

//logout user
router.get('/logout',(req,res)=>{

    res.clearCookie()
    req.session.destroy();
    res.sendStatus(200);
    }); 

router.get('/login',(req, res) => {
if(req.session.user){
    res.send({loggedIn:true, user:req.session.user})
}else{
    res.send({loggedIn:false})

}

})
// Login Route
router.post('/login',(req, res) => {

    const username = req.body.username;
    const password = req.body.password;
    console.log("username :" +username)
    console.log("password :" +password)
 
    if(username !=="" && password !==""){
        const fecthUsersQuery = `SELECT r.ID,u.Name AS UserName, r.Password FROM restaurant r,user u WHERE u.ID = r.UserID and u.Name = '${username}' and r.Password = '${password}';`
        db.query(fecthUsersQuery, (err, results) => {
            
            if(err){ 
                return res.json({
                    status: 'bad',
                    message: "Something went wrong, try again later"
                }); 
            }
            for(let user of results){ 
                if(username === user.UserName && password === user.Password){
                    req.session.user = results
                    console.log(req.session.user);
                    return res.json({
                        status: 'good',
                        message: "logged in seccessfully"
                    })
                }
                else{
                    return res.json({
                        status: 'bad',
                        message: "username or password are incorrect"
                    }); 
                }
            }   
        })
    }
})

module.exports = router;
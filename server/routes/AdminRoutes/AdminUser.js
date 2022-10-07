const express = require("express");
const router = express.Router();

const { isEquale } = require("./functions/Validator");
const { JsonRes } = require("./functions/JsonResponse");
const { DBConnection } = require("../../assist/DBConnection");
const db = DBConnection.connect();

router.get('/', (req, res) => {
    let fetchUsers = `SELECT c.ID, u.Name, c.IsBanned
    FROM user u 
    join customer c 
    ON u.ID = c.UserID 
    WHERE c.IsBanned = 0
    ORDER BY c.ID`;
    db.query(fetchUsers, (err, results) => {
        if(err) JsonRes('bad', 'Something went wrong', res)
        else
        {
            return res.json({ users: results })
        }
    })
})

router.get('/blacklist', (req, res) => {
    let fetchUsers = `SELECT c.ID, u.Name, c.IsBanned
    FROM user u 
    join customer c 
    ON u.ID = c.UserID 
    WHERE c.IsBanned = 1
    ORDER BY c.ID`;
    db.query(fetchUsers, (err, results) => {
        if(err) JsonRes('bad', 'Something went wrong', res)
        else
        {
            return res.json({ users: results })
        }
    })
})

router.get('/:id', (req, res) => {
    let userID = req.params.id;
    const fetchUser = `
        SELECT * FROM \`user\` u  JOIN customer c 
        ON u.ID = c.UserID
        WHERE c.ID = ${userID}  
    `;
    const fetchUserReviews = `
        SELECT * FROM user u  JOIN customer c 
        ON u.ID = c.UserID
        JOIN review r
        ON c.ID = r.CustomerID
        WHERE c.ID = ${userID}  
    `;
    const fetchUserOrders = "SELECT * FROM user u JOIN customer c  ON u.ID = c.UserID JOIN `order` o ON c.ID = o.CustomerID JOIN order_item oi ON o.ID = oi.OrderID WHERE c.ID = " + userID;
    db.query(fetchUser, (err, infoResult) => {
        if(err) console.log(err)
        else{
            db.query(fetchUserReviews, (err, reviewResult) => {
                if(err) console.log(err)
                else{
                    db.query(fetchUserOrders, (error, orderResult) => {
                        if(error) console.log(error)
                        else{
                            return res.json({
                                reviewResult: reviewResult,
                                orderResult: orderResult,
                                info: infoResult
                            })
                        }
                    })
                }
            })
        }
    })
})

router.post('/:id/ban', (req, res) => {
    let customerID = req.params.id
    let banQuery = `UPDATE customer SET IsBanned = 1 WHERE ID = ${customerID}`;
    db.query(banQuery, (err) => {
        if(err) {
            console.log(err)
            JsonRes("bad", "Something went wrong", res)
        }
        else{
            res.json({ isExist: 1 })
        }
    })
})

router.post('/:id/unban', (req, res) => {
    let customerID = req.params.id
    let banQuery = `UPDATE customer SET IsBanned = 0 WHERE ID = ${customerID}`;
    db.query(banQuery, (err) => {
        if(err) {
            console.log(err)
            JsonRes("bad", "Something went wrong", res)
        }
        else{
            res.json({ isExist: 1 })
        }
    })
})

module.exports = router
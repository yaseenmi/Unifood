const express = require("express");
const router = express.Router();

const { isEmpty } = require("./functions/Validator");
const { JsonRes, JsonResRest } = require("./functions/JsonResponse");
const { DBConnection } = require("../../assist/DBConnection");
const db = DBConnection.connect();


// File Stream
const fileStream = require('fs');


// POST REQUEST FOR ADDING A RESTAURANT
router.post('/add', (req, res) => {

    const name = req.body.name;
    const phone = req.body.phone;
    const password = Math.random().toString(36).slice(-10); // RANDOM PASSWORD
    let file;
    let finalFileName;
    let isPassExist = false;
    let isNameExist = false;
    let isError = false;
    let isPassInvaild = true;
    let isClosed = 0;
    let isExist = 1;
    let UserID;

    // NEEDED QUERIES
    const fecthRestaurantsQuery = "SELECT password FROM restaurant";
    const insertUserQuery = "INSERT INTO user(Name, Phone) VALUES(?, ?)";
    const insertRestaurantQuery = "INSERT INTO restaurant(Password, Image, IsClosed, UserID, IsExist) VALUES (?, ?, ?, ?, ?)";
    const fetchLastUserID = "SELECT ID FROM user ORDER BY ID DESC LIMIT 1";
    const deleteUser = "DELETE FROM user WHERE ID = ?"; // INCASE OF ADDING RESTAURANT FAILER

    // NEEDED DIRECTORIES
    let restaurantDir = `public/images/restaurants/${name}/`;
    let restaurantProfile = `public/images/restaurants-images/`;
    let restaurantProducts = `public/images/restaurants/${name}/products/`;
    let restaurantCategories = `public/images/restaurants/${name}/categories/`;

    // EMPTY CHECK
    if(isEmpty(name) || isEmpty(password) || isEmpty(phone)) { return JsonRes('bad', 'Something went wrong, try again later', res); }
    
    else
    {   
        // FETCHING RESTAURANT NAME AND PASS FOR CHECK
        db.query(fecthRestaurantsQuery, (err, results) => {
            
            if(err) { 
                isError = true; 
                return JsonRes('bad', 'Fetch restaurant Error', res);
            }
             
            else
            {
                // CHECKING THE GENERATED PASSWORD, IF THE GENERATED PASS IS EXIST GENERATE ANOTHER AND CHECK AGAIN
                while(isPassInvaild){ 
                    for(let data of results){
                        if(password === data.password){
                            isPassExist = true;
                            break;
                        }
                    }
                    if(isPassExist){
                        password = Math.random().toString(36).slice(-10);
                    }
                    else{
                        isPassInvaild = false;
                    }
                }
                // CHECKING IF NAME EXIST
                for(let data of results){
                    if(name === data.name){
                        isNameExist = true;
                        break;
                    }
                }
                if(isNameExist){
                    isError = true; 
                    return JsonRes('bad', 'Restaurant name is already exist!', res);
                }

            }

            if(!isError){
                // CHECKING IF IMAGE IS UPLOADED
                if(req.files === null){ 
                    return JsonRes('bad', 'Restaurant image is required!', res);
                }
                else
                {
                    file = req.files.img;
                    const fileExt = req.files.img.name.split('.').pop();
                    const fileName = Math.random().toString(16).slice(2);
                    finalFileName = fileName + '.' + fileExt;

                    // CONSTRACTING THE DIRECTORIES
                    fileStream.mkdirSync(restaurantDir, {recursive:true});
                    fileStream.mkdirSync(restaurantProfile, {recursive:true});
                    fileStream.mkdirSync(restaurantProducts, {recursive:true});
                    fileStream.mkdirSync(restaurantCategories, {recursive:true});
        
                    // CHECKING IF THE CONSTRACTING HAS SUCCEEDED
                    if(fileStream.existsSync(restaurantDir) && fileStream.existsSync(restaurantProfile) && fileStream.existsSync(restaurantProducts) && fileStream.existsSync(restaurantCategories)){
                            
                        db.query(insertUserQuery, [name, phone], (err) => {
                            
                            if(err){ 
                                return JsonRes('bad', 'Something went wrong, try again later', res);
                            }
                            else
                            { 
                                db.query(fetchLastUserID, (err, results) => {
        
                                    if(err) {
                                        return JsonRes('bad', 'Last user Error', res);
                                    }     
                                    else {
                                        UserID = results[0].ID;
                                        db.query(insertRestaurantQuery, [password, finalFileName, isClosed, UserID, isExist], (err) => {
                                            if(err){
                                                db.query(deleteUser, [UserID], (err) => {
                                                    if(err){ return JsonRes('bad', 'Failed to remove user', res); }
                                                    else{
                                                        return JsonRes('bad', 'Insert restaurant error', res);
                                                    }
                                                }) 
                                            }
                                            else
                                            {
                                                file.mv(`public/images/restaurants-images/${finalFileName}`, err => {
                                                    if(err){ 
                                                        return res.json({
                                                            status: 'bad',
                                                            message: "Something went wrong, try again later"
                                                        }); 
                                                    }
                                                })
                                                return JsonRes('good', 'Restaurant added successfully!', res);
                                            }
                                        })
                                    }                                 
                                })
                            }
                        })
                    }
                    else{
                        return JsonRes('bad', 'Something went wrong, try again later', res);
                    }
                }
            }   
        })                       
    }
})

router.get('/', (req, res) => {

    fetchRestaurants = "SELECT r.ID, r.Image, r.IsClosed, r.IsExist, u.Name, r.UserID, u.Phone, r.Password FROM restaurant r join user u on r.UserID = u.ID WHERE r.IsExist = 1";

    db.query(fetchRestaurants, (err, results) => {
        if(err){
            console.log(err)
        }
        else{
            return res.json({
                rests: results
            })
        }
        
    })
})

router.get('/hidden', (req, res) => {

    fetchRestaurants = "SELECT * FROM restaurant r join user u on r.UserID = u.ID WHERE r.IsExist = 0 ";

    db.query(fetchRestaurants, (err, results) => {
        if(err){
            console.log(err)
        }
        else{
            return res.json({
                rests: results
            })
        }
        
    })
})

router.get('/:name', (req, res) => {

    let name = req.params.name;
    
    fetchRestaurant = "SELECT * FROM restaurant r join user u on r.UserID = u.ID WHERE Name = ?";
    fetchRestaurantRate = `
    SELECT AVG(rat.Value) as avgRate
    FROM restaurant r
    join \`user\` u 
    on r.UserID = u.ID
    join category c
    on c.RestaurantID = r.ID
    join product p
    on p.CategoryID = c.ID
    join rate rat
    on rat.ProductID = p.ID
    WHERE u.Name = '${name}'`;
    
    db.query(fetchRestaurant, name,(err, results) => {
        if(err){
            console.log(err)
        }
        else{
            db.query(fetchRestaurantRate, (err, rateResult) => {
                if(err){
                    console.log(err)
                } else{
                    return res.json({
                        rest: results,
                        rate: rateResult[0].avgRate
                    })
                }    
            })
            
        }  
    })
})
router.post('/:name/edit', (req, res) => {

    let userName = req.params.name;

    let id = req.body.id;
    let newUserName = req.body.name;
    let password = req.body.password;
    let phone = req.body.phone;
    let isClosed = req.body.isClosed;
    let isExist = req.body.isExist;
    let userID = req.body.userID;
    let oldImage = req.body.oldImg;

    let file;
    let finalFileName;

    let imagePath = `public/images/restaurants-images/${oldImage}`;
    
    const updateUser = "UPDATE user SET Name = ?, Phone = ? WHERE Name = ?";
    const updateRestaurant = "UPDATE restaurant SET Password = ?, Image = ? WHERE UserID = ?";

    if(isEmpty(newUserName) || isEmpty(password) || isEmpty(phone)) { return JsonRes('bad', '*Feilds cannot be empty', res); }
    
    else
    {
        if(req.files == null){ 
            finalFileName = req.body.img;
        }
        else
        {
            file = req.files.img;
            const fileExt = req.files.img.name.split('.').pop();
            const fileName = Math.random().toString(16).slice(2);
            finalFileName = fileName + '.' + fileExt;
        }

        let restaurant = [
            {
                ID: id,
                Name: newUserName,
                Password: password,
                Phone: phone,
                IsClosed: isClosed,
                IsExist: isExist,
                UserID: userID,
                Image: finalFileName
            }
        ]

        db.query(updateUser, [newUserName, phone, userName], (err) => {
            if(err) {
                console.log(err)
                return JsonResRest('bad', '*Something went wrong while trying to update User info, try again later', restaurant, res);
            }
            else
            {
                db.query(updateRestaurant, [password, finalFileName, id], (err) => {
                    if(err) {
                        console.log(err)
                        return JsonResRest('bad', '*Something went wrong while trying to update Restaurant info, try again later', restaurant, res);
                    }
                    else
                    {
                        if(req.files == null){ 
                            return JsonResRest('good', '', restaurant, res) 
                        }
                        else
                        {       
                            fileStream.unlink(imagePath, (err) => {
                                if(err){
                                    console.log(err);
                                    return JsonResRest('bad', '*Something went wrong while trying to update image, try again later', restaurant, res);
                                }
                                else
                                {
                                    let folderPath = `public/images/restaurants-images/${finalFileName}`;   
                                    file.mv(folderPath, (err) => {
                                        if(err){
                                            console.log(err);
                                            return JsonResRest('bad', '*Something went wrong while trying to move image, try again later', restaurant, res);
                                        }
                                        else
                                        {
                                            return JsonResRest('good', '', restaurant, res)    
                                        }
                                    })
                                }
                            })
                        }     
                    }
                })
            }
        })
    }
})
// router.post('/:name/edit', (req, res) => {

//     let userName = req.params.name;

//     let id = req.body.id;
//     let newUserName = req.body.name;
//     let password = req.body.password;
//     let phone = req.body.phone;
//     let isClosed = req.body.isClosed;
//     let isExist = req.body.isExist;
//     let userID = req.body.userID;
//     let oldImage = req.body.oldImg;

//     let file;
//     let finalFileName;

//     let imagePath = `public/images/restaurants/${userName}/profile-image/${oldImage}`;
    
//     const updateUser = "UPDATE user SET Name = ?, Phone = ? WHERE Name = ?";
//     const updateRestaurant = "UPDATE restaurant SET Password = ?, Image = ? WHERE UserID = ?";

//     if(isEmpty(newUserName) || isEmpty(password) || isEmpty(phone)) { return JsonRes('bad', '*Feilds cannot be empty', res); }
    
//     else
//     {
//         if(req.files == null){ 
//             finalFileName = req.body.img;
//         }
//         else
//         {
//             file = req.files.img;
//             const fileExt = req.files.img.name.split('.').pop();
//             const fileName = Math.random().toString(16).slice(2);
//             finalFileName = fileName + '.' + fileExt;
//         }

//         let restaurant = [
//             {
//                 ID: id,
//                 Name: newUserName,
//                 Password: password,
//                 Phone: phone,
//                 IsClosed: isClosed,
//                 IsExist: isExist,
//                 UserID: userID,
//                 Image: finalFileName
//             }
//         ]

//         db.query(updateUser, [newUserName, phone, userName], (err) => {
//             if(err) {
//                 console.log(err)
//                 return JsonResRest('bad', '*Something went wrong while trying to update User info, try again later', restaurant, res);
//             }
//             else
//             {
//                 db.query(updateRestaurant, [password, finalFileName, id], (err) => {
//                     if(err) {
//                         console.log(err)
//                         return JsonResRest('bad', '*Something went wrong while trying to update Restaurant info, try again later', restaurant, res);
//                     }
//                     else
//                     {
//                         if(req.files == null){ 
//                             if(newUserName !== userName)
//                             {
//                                 let currentRestaurantDir = `public/images/restaurants/${userName}/`;
//                                 let newRestaurantDir = `public/images/restaurants/${newUserName}/`;
//                                 fileStream.rename(currentRestaurantDir, newRestaurantDir, (err) => {
//                                     if(err){
//                                         console.log(err);
//                                         return JsonResRest('bad', '*Something went wrong while trying to update dir, try again later', restaurant, res)
//                                     }    
//                                     else 
//                                         return JsonResRest('good', 'Restaurant edited successfully', restaurant, res)
//                                 })
//                             }
//                             else return JsonResRest('good', 'Restaurant edited successfully', restaurant, res) 
//                         }
//                         else
//                         {       
//                             fileStream.unlink(imagePath, (err) => {
//                                 if(err){
//                                     console.log(err);
//                                     return JsonResRest('bad', '*Something went wrong while trying to update image, try again later', restaurant, res);
//                                 }
//                                 else
//                                 {
//                                     let folderPath = `public/images/restaurants/${userName}/profile-image/${finalFileName}`;
//                                     file.mv(folderPath, (err) => {
//                                         if(err){
//                                             console.log(err);
//                                             return JsonResRest('bad', '*Something went wrong while trying to move image, try again later', restaurant, res);
//                                         }
//                                         else
//                                         {
//                                             if(newUserName !== userName)
//                                             {
//                                                 let currentRestaurantDir = `public/images/restaurants/${userName}/`;
//                                                 let newRestaurantDir = `public/images/restaurants/${newUserName}/`;
//                                                 fileStream.rename(currentRestaurantDir, newRestaurantDir, (err) => {
//                                                     if(err) {
//                                                         console.log(err)
//                                                         return JsonResRest('bad', '*Something went wrong while trying to update dir, try again later', restaurant, res);
//                                                     }
//                                                     else
//                                                         JsonResRest('good', 'Restaurant edited successfully', restaurant, res) 
//                                                 })
//                                             }
//                                             else
//                                                 return JsonResRest('good', 'Restaurant edited successfully', restaurant, res)    
//                                         }
//                                     })
//                                 }
//                             })
//                         }     
//                     }
//                 })
//             }
//         })
//     }
// })

router.post('/:name/hide', (req, res) => {
    let ID = req.body.id
    let hideQuery = `UPDATE restaurant SET IsExist = 0 WHERE UserID = ${ID}`;
    db.query(hideQuery, (err) => {
        if(err) {
            console.log(err)
            JsonRes("bad", "Something went wrong", res)
        }
        else{
            res.json({ isExist: 1 })
        }    
    })
})

router.post('/:name/unhide', (req, res) => {
    let ID = req.body.id
    let hideQuery = `UPDATE restaurant SET IsExist = 1 WHERE UserID = ${ID}`;
    db.query(hideQuery, (err) => {
        if(err) {
            console.log(err)
            JsonRes("bad", "Something went wrong", res)
        }
        else{
            res.json({ isExist: 0})
        }
        
    })
})

router.get('/:name/review', (req, res) => {

    let name = req.params.name;

    const fetchReviews = `
    SELECT DISTINCT re.Text, re.Date as ReviewDate, u.Name as UserName, p.Name as ProductName, re.Like, re.Dislike
    FROM review re JOIN customer c
    ON re.CustomerID = c.ID
    JOIN \`user\` u
    ON u.ID = c.UserID
    JOIN product p
    ON re.ProductID = p.ID
    JOIN category ca
    ON ca.ID = p.CategoryID
    JOIN restaurant r
    ON ca.RestaurantID = r.ID
    JOIN \`USER\` us
   	ON us.ID = r.UserID
    WHERE us.Name = '${name}'
    ORDER BY re.Date DESC
    `;

    db.query(fetchReviews, (err, results) => {
        if(err) console.log(err);
        else
        {   
            return res.json({
                reviews: results
            })
        }
    })
})




module.exports = router


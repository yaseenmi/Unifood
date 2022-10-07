const { sign, verify } = require(`jsonwebtoken`);

const createTokens = (user) => {
    const accessToken = sign(
        { username: user.username, id: user.id }, 
        `secret`
    )
    
    return accessToken;
}

const validateToken = (req, res, next) => {
    const accessToken = req.cookies[`access-token`];
    
    if(!accessToken) {
        return res.json({ status: `bad`, message: `User is not authenticated`}) 
    }

    try{
        const vailedToken = verify(accessToken, `secret`);
        if(vailedToken){
            req.authenticated = true;
            return next();
        }
    } 
    catch(err){
        return res.json({status:`bad`, message: `unvalied token`})
    }
}

module.exports = { createTokens, validateToken }
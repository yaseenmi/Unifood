class JsonResponse{
    static JsonRes = (st, msg, res) => {
        return res.json({
            status: st,
            message: msg
        });     
    }
    
    static JsonResRest = (st, msg, restaurant,res) => {
        return res.json({
            rest: restaurant,
            status: st,
            message: msg
        });     
    }  
}

module.exports = JsonResponse
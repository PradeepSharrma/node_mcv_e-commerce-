const jwt = require('jsonwebtoken');
const config = require('../config/config');
// const config = process.env;

const verifyToken = async(req , res , next)=>{
    let token = req.body.token || req.query.token || req.headers["x-access-token"];
   

    if(req.headers['authorization']){
        token = req.headers['authorization'];
        token = token.split(' ')[1];
    }
    // console.log(token)
    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        const decoded = jwt.verify(token,config.secret_jwt);
        req.user = decoded;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
}

module.exports = verifyToken;
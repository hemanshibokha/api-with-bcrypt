const jwt = require('jsonwebtoken');

const verifyToken = (req,res,next) => {
    const token = req.headers.authorization;
    console.log(token);
    const finalToken = token.slice(7);
    jwt.verify(finalToken,'hemanshi',(error,decoded)=>{
        if(error){
            return res.json({ message: 'Invalid Token', status: 0});
        }
        req.user = decoded;
        next();
    })
}

const checkRole = (role) => {
    return (req,res,next) => {
        console.log(req.user.payload.role);
        if(req.user.payload.role === role){
            next();
        }
        else{
            return res.json({ message: 'Access Denied', status: 0});
        }
    }
}

const userRole = (role) => {
    return (req,res,next) => {
        console.log(req.user.payload.role);
        if(req.user.payload.role === 'user'){
            next();
        }
        else{
            return res.json({ message: 'Access Denied', status: 0});
        }
    }
}

module.exports = {
    verifyToken,
    checkRole,
    userRole
}
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const VerifyToken = async (req,res,next) =>{
    const {authorization} = req.headers

    if(!authorization){
        res.status(401).json({verify:"fail",error:'Authorization token required'})
        return 
    }
    const token = authorization.split(' ')[1]

    try {        
        const {_id} = jwt.verify(token,process.env.SECRET)
        
        req.user = await User.findById(_id).select('username') 

        next();
    } catch (error) {        
        res.status(401).json({verify:"fail",error:'Request is not authorized'})
    }
}

module.exports = VerifyToken
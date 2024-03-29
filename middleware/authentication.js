const User = require('../models/User');
const jwt = require('jsonwebtoken');
const {UnauthenticatedError} = require('../errors')
const auth =async (req,res,next) =>{
    //check headers
    const authHeader  = req.headers.authorization
    if(!authHeader || ! authHeader.startsWith('Bearer ')){
        throw new UnauthenticatedError('Authentication invalid')
    }
    const token = authHeader.split(' ')[1]

try{
    const payload = jwt.verify(token, process.env.JWT_SECRET)
//attact user to job routes

// req.user ={userId:payload.userId, name:payload.name}
const user = User.findOne(payload.userId).select('-password')
req.user = user
req.user ={userId:payload.userId, name:payload.name}
next();
} catch(error){
throw new UnauthenticatedError('Authencation invalid')
}
}
module.exports = auth
const ErrorHander = require("../utils/errorhander.js");
const catchAsyncErors = require("./catchAsyncErors.js");
const jwt = require('jsonwebtoken')
const User = require('../models/userModels')

exports.isAuthenticatedUser = catchAsyncErors(async(req,res,next) => {
    
    const {token} = req.cookies

    if (!token) {
    return next(new ErrorHander('Please login to access this resource',401))
    }
    
    const decodedData = jwt.verify(token, process.env.JWT_SECRET)
    
    req.user = await User.findById(decodedData.id)

    next()

})

exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorHander(`Role: ${req.user.role} is not allowed to access this resource`,403))
        }

        next()
    }
}


const ErrorHander = require('../utils/errorhander.js')
const catchAsyncErrors = require('../middleware/catchAsyncErors')
const User = require('../models/userModels')
const sendToken = require('../utils/jwtToken')
const sendEmail = require('../utils/sendEmail')
const crypto = require('crypto')
const cloudinary = require('cloudinary')

//Register a User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: 'avatars',
        // width: 150,
        // crop:'scale',
    })
   
 

    const { name, email, password } = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        },
    })


    sendToken(user,201,res)
})

// Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body
    
    //checking if user has given password and email both

    if (!email || !password) {
        return next(new ErrorHander('please enter email & password'),400)
    }

    const user = await User.findOne({ email }).select('+password')

    
    
    if (!user) {
        
        return next(new ErrorHander('Invalid email or password 1'),401)
    }

    const isPasswordMatched = await user.comparePassword(password)
 

    if (!isPasswordMatched) {
    
        return next(new ErrorHander('Invalid email or password 2'), 401)
        
    
    }
 
    

    sendToken(user,200,res)

    // const token = user.getJWTToken();

    // res.status(200).json({
    //     success: true,
    //     token,
    // })

})

//logout User

exports.logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    })

    res.status(200).json({
        success: true,
        message: 'Logged out'
    })
})

//Forgot password

exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email })
    
    if (!user) {
        return next(new ErrorHander('User not found'), 404)

    }

    //Get ResetPassword Token
    const resetToken = user.getResetPasswordToken()

    await user.save({ validateBeforeSave: false })
    
    const resetPasswordUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;

    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\n If you have not requested this email
    then, please ignore it `;

    try {
        await sendEmail({
            email: user.email,
            subject: `Ecommerce Password Recovery`,
            message,
        }) 

        res.status(200).json({
            success: true,
            message:`Email sent to  ${user.email} successfully`
        })

        
    } catch (error) {
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined

        await user.save({ validateBeforeSave: false })

        return next(new ErrorHander(error.message),500)
    }
})

// Reset password

exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
    
    //create token hash
    const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex')
    
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt: Date.now()},
    })

    if (!user) {
        return next(new ErrorHander('Reset password token is invalid or has been expired', 400))
        
    }

    if (req.body.password !== req.body.comfirmPassword) {
        return next(new ErrorHander('password does not password'), 400)
    }

    user.password = req.body.password
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined

    await user.save()

    sendToken(user,200,res)

})

// //get user detail

exports.getUserDetail = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id)

    res.status(200).json({
        success: true,
        user,
    })
})

// //Update user password

exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password')

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword)
    
    if (!isPasswordMatched) {
        return next(new ErrorHander('Old password is incorrect'), 400) 
    }
    
    if (req.body.newPassword !== req.body.comfirmPassword) {
        return next(new ErrorHander('password does not match',400))
    }

    user.password = req.body.newPassword

    await user.save()

    sendToken(user,200,res)

})

//Update User Profile

exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
    const newUserDate = {
        name: req.body.name,
        email: req.body.email,
    }

    //we will and cloudinary later

    const user = await User.findByIdAndUpdate(req.user.id, newUserDate, {
        new: true,
        runValidators: true,
        useFindAndModify:false
        
    })
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    }

    //we will and cloudinary later
    // const imageId = user.avatar.public_id
    // await cloudinary.v2.uploader.destroy(imageId)

    // const user = await User.findByIdAndUpdate(req.user.id, {
    //     folder: 'avatars',
    //     width: 150,
    //     crop:'scale',
        
    // })
    // newUserData.avatar = {
    //     public_id: myCloud.public_id,
    //     url:myCloud.secure_url,
    // }

    res.status(200).json({
        success: true,
    })
})

//Get All User (admin)

exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find()

    res.status(200).json({
        success: true,
        users
    })
})

//Get Single User (admin)

exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id)

    if (!user) {
        return next(new ErrorHander(`User does not exits with Id: ${req.params.id}`))
    }

    res.status(200).json({
        success: true,
        user
    })
})

//Update User Role -- Admin
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
    const newUserDate = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
    }

    const user = await User.findByIdAndUpdate(req.params.id, newUserDate, {
        new: true,
        runValidators: true,
        useFindAndModify:false   
    })

    res.status(200).json({
        success: true,
    })
})

//Delete User  -- Admin
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id)

    //we will remove cloudinary later

    if (!user) {
        return next(new ErrorHander(`User does not exits with Id: ${req.params.id}`))
    }

    await user.deleteOne()


    res.status(200).json({
        success: true,
        message:"User deleted successfully"
    })
})

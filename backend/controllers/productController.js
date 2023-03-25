const Product = require('../models/productModel')
const ErrorHander = require('../utils/errorhander.js')
const catchAsyncErrors = require('../middleware/catchAsyncErors')
const ApiFeatures = require('../utils/apifeatures.js')


// create product -- admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {

    req.body.user = req.user.id

    const product = await Product.create(req.body)

    res.status(201).json({
        success: true,
        product
    })
})


//GET ALL PRODUCT
exports.getAllProducts = catchAsyncErrors(async (req, res,next) => {
   

    const resultPerPage = 8;
    const productsCount = await Product.countDocuments();
    
    const apifeature = new ApiFeatures(Product.find(), req.query)
        .filter()
        .search()
        .pagination(resultPerPage)


    const products = await apifeature.query

    res.status(200).json({
        success: true,
        products,
        productsCount,
        resultPerPage,
    })
})

//Get Product Detail
exports.getProductDetails = catchAsyncErrors( async (req, res, next) => {
    
    const product = await Product.findById(req.params.id)

    if (!product) {
        return next(new ErrorHander("Product not found",500))
    }
    
    res.status(200).json({
        success: true,
        product
    })
})



//Update product --Admin
exports.updateProduct = catchAsyncErrors( async (req, res, next) => {
    let product = await Product.findById(req.params.id)

    if (!product) {
        return next(new ErrorHander("Product not found",500))
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify:false
    })

    res.status(200).json({
        success: true,
        product
    })
})


// Delete product --admin

exports.deleteProduct = catchAsyncErrors( async (req, res, next) => {
    
    const product = await Product.findById(req.params.id)

    if (!product) {
        return next(new ErrorHander("Product not found",500))
    }

    //await product.remove()
    await Product.deleteOne()
    
    res.status(200).json({
        success: true,
        message:"Delete product successfully"
    })
})

//Create new review  or Update the review

exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
    const { rating, comment, productId } = req.body
    
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    }

    const product = await Product.findById(productId)

    const isReviewed = product.reviews.find(rev => rev.user.toString() === req.user._id.toString())

    if (isReviewed) {
        product.reviews.forEach(rev => {
            if (rev.user.toString() === req.user._id.toString())
                rev.rating = rating,
                rev.comment = comment
        })
    }
    else {
        console.log('1')
        product.reviews.push(review)
        product.numOfReviews = product.reviews.length
    }

    //4,5,2,2 = 16/4 =4
    let avg = 0

    product.reviews.forEach((rev) => {
        avg+=rev.rating
    })

    product.ratings =avg / product.reviews.length
     
    await product.save({ validateBeforeSave: false })
    
    res.status(200).json({
        success:true,
    })
})

//Get all reviews of a product
exports.getAllProductReviews = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.id)

    if (!product) {
        return next(new ErrorHander('Product not found'),404)
    }

    res.status(200).json({
        success: true,
        reviews:product.reviews,
    })
})

//Delete Reviews

exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.productId)

    if (!product) {
        return next(new ErrorHander('Product not found '),404)
    }

    const reviews = product.reviews.filter(
        rev => rev._id.toString() !== req.query.id.toString()
    )

    let avg = 0

    reviews.forEach(rev => {
        avg+=rev.rating
    })

    const ratings = avg / reviews.length
    
    const numOfReviews = reviews.length

    await Product.findByIdAndUpdate(
        req.query.productId,
        {
            reviews,
            ratings,
            numOfReviews
        },
        {
            new: true,
            runValidators: true,
            useFindAndModify: false
        }

    )


    res.status(200).json({
        success: true,
    })
})
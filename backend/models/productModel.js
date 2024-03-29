const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: ["Please enter product name", true],
        trim:true
    },
    description: {
        type: String,
        required: [true, 'Please enter product description']
    },
    price: {
        type: String,
        required: [true, 'Please enter product price'],
        maxLength:[12,"Price cannot exceed 12 characters"]
    },
    ratings: {
        type: Number,
        default:0
    },
    images:
        [
        {
            public_id: {
                type: String,
               
            }
        ,
    
            url: {
                type: String,
              
            }
        }
        ]
    ,
    category: {
        type: String,
        required: [true, 'Please enter product category'],
    },
    Stock: {
        type: Number,
        required: [true, 'Please enter product stock'],
        maxLength: [4, 'Stock cannot exceed 4 characters'],
        default:1
    },
    numOfReviews: {
        type: Number,
        default: 0,
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'User',
                required:true,
            }
            ,
            name: {
                type: String,
                required:true
            },
            rating: {
                type: Number,
                required:true
            },
            comment: {
                type: String,
                required:true
            }
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required:true,
    }
    ,
    createAt: {
        type: Date,
        default:Date.now
    }
})

module.exports = mongoose.model('Product',productSchema)
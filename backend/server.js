const app = require('./app')

const dotenv = require('dotenv')

const connectDatabase = require('./config/database')
const cloudinary = require('cloudinary');
// const { CloudinaryStorage } = require('multer-storage-cloudinary');
// const multer = require('multer');
// // Handling Uncaught Exception
// process.on('uncaughtException', (err) => {
//     console.log(`Error: ${err.message}`)
//     console.log(`Shutting down the server due to Uncaught Exception`)
//     process.exit(1)
// })


//config

dotenv.config({path:'backend/config/config.env'})

//Connecting to database

connectDatabase()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_KEY,
    api_secret:process.env.CLOUDINARY_SECRET,
})

// const storage = new CloudinaryStorage({
//     cloudinary,
//     allowedFormats: ['jpg', 'png'],
//     filename: function (req, file, cb) {
//       cb(null, file.originalname); 
//     }
//   });
  
//   const uploadCloud = multer({ storage });

const server = app.listen(process.env.PORT, () => {
    console.log(`Server woking on http://localhost:${process.env.PORT}`)
})



//Unhandled Promise Rejection
process.on('unhandledRejection', err => {
    console.log(`Error: ${err.message}`)
    console.log(`Shutting down the server due to Unhandled Promise Rejection`)

    server.close(() => {
        process.exit(1)
    })

})
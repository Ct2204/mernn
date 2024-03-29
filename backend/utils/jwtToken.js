
//Create Token and saving in cookie

const sendToken = (user, statuscode, res) => {
    const token = user.getJWTToken();

    //option for cookie
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 *1000
        ),
        httpOnly: true,
    }

    res.status(statuscode).cookie('token', token, options).json({
        user,
        success: true,
        token,
    })
}

module.exports = sendToken
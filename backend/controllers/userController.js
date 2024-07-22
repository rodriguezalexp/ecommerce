const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")


const registerUser = asyncHandler( async (req, res) => {
    const {name, email, password} = req.body

    // Validation
    if (!name || email || password) {
        res.status(400)
        throw new Error("please fill all the required fields")
    }
    if (password.lenght < 6) {
        res.status(400)
        throw new Error("The password must be up to 6 characters")
    }
    
    // check if the email exists
    const userExists = await User.findOne({email})
    if (userExists) {
        res.status(400)
        throw new Error("The email already exists")
    }
});

module.exports = {
    registerUser,
};
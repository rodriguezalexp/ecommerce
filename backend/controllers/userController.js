const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const jwt = require("jsonwebtoken")

//login user
const genetareToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "1d"})
}

// Register User
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
  
    // Validation
    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Please fill in all required fields");
    }
    if (password.length < 6) {
      res.status(400);
      throw new Error("Password must be up to 6 characters");
    }
    
    // check if the email exists
    const userExists = await User.findOne({email});
    if (userExists) {
        res.status(400);
        throw new Error("The email already exists");
    }

    //Create new user

    const user = await User.create({
        name,
        email,
        password,
    });

    if (user) {
        const {_id, name, email, photo, phone, bio} = user
        res.status(201).json({
            _id, name, email, photo, phone, bio,
        });
    } else {

    }
});


module.exports = {
    registerUser,
};
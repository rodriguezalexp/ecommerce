const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

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

    //Generate new token

    const user = await User.create({
        name,
        email,
        password,
    });

    //Create new user
    const token = genetareToken(user._id);

    // send HTTP-only cookie
    res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86),
        sameSite: "none",
        secure: true,
    })


    if (user) {
        const {_id, name, email, photo, phone, bio} = user
        res.status(201).json({
            _id, name, email, photo, phone, bio, token,
        });
    } else {

    }
});


// Login user

const loginUser = asyncHandler( async (req, res) => {

    const {email, password} = req.body

    if (!email, !password) {
        res.status(400);
        throw new Error("Please add email and password");
      }

    // check if user exists
    const user = await User.findOne({email})

    if (!user) {
        res.status(400);
        throw new Error("user not found, please sign up");
    }

    // check if password is correct

    const passwordIsCorrect = await bcrypt.compare(password, user.password)

    //Create new user
    const token = genetareToken(user._id);

    // send HTTP-only cookie
    res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86),
        sameSite: "none",
        secure: true,
    });

    if (user && passwordIsCorrect) {
        const {_id, name, email, photo, phone, bio} = user
        res.status(201).json({
            _id, name, email, photo, phone, bio, token,
        });
    } else {
        res.status(400);
        throw new Error("Invalid email or password");

    }

});

// Logout function

const logout = asyncHandler (async (req, res) => {
    res.cookie("token", "", {
        path: "/",
        httpOnly: true,
        expires: new Date(0),
        sameSite: "none",
        secure: true,
    });
    return res.status(200).json({message: "succefully logged out"})
});

const getUser = asyncHandler ( async (req, res) => {
    res.send("get user data")
}) 


module.exports = {
    registerUser,
    loginUser,
    logout,
    getUser,
};
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Token = require("../models/tokenModel");
const crypto = require("crypto");

//generate token
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
    const user = await User.findById(req.user._id)

    if (user) {
        const {_id, name, email, photo, phone, bio} = user
        res.status(200).json({
            _id, name, email, photo, phone, bio,
        });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

//get loggin status
const logginStatus = asyncHandler ( async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        res.json(false)
    }

    //verify token
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (verified) {
        res.json(true)
    }
    return res.json(false);
});


// Update user route

// this route user is protected, req.user._id is the token
const updateUser = asyncHandler (async (req, res) => {
    const user = await User.findById(req.user._id)
    if (user) {
        const {name, email, photo, phone, bio} = user;
        user.email = email;
        user.name = req.body.name || name;
        user.photo = req.body.photo || photo;
        user.phone = req.body.phone || phone;
        user.bio = req.body.bio || bio;

        const updatedUser = await user.save();
        res.status(200).json({
            _id: updatedUser._id, name: updatedUser.name, email: updatedUser.email, photo: updatedUser.photo, phone: updatedUser.phone, bio: updatedUser.bio,
        })
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

const changePassword = asyncHandler ( async (req, res) => {
    const user = await User.findById(req.user._id);

    const {oldPassword, password} = req.body;

    if (!user) {
        res.status(400);
        throw new Error("User not found, please login or singup");
    }

    // Validate
    if (!oldPassword || !password) {
        res.status(400);
        throw new Error("Please enter the required fields");
    }

    //check if password matched in DB
    const passwordIsCorrect = await bcrypt.compare(oldPassword, user.password)

    if (user && passwordIsCorrect) {
        user.password = password;
        await user.save()
        res.status(200).send("password changed")
    } else {
        res.status(400);
        throw new Error("passwords don't match")
    }

});

// Forgot password route
const forgotPassword = asyncHandler ( async (req, res) =>{
    const {email} = req.body
    const user = await User.findOne({email})

    if (!user) {
        res.status(400)
        throw new Error("User not exists")
    }

    // Create Reste Token
    let resetToken = crypto.randomBytes(32).toString("hex") + user.id;
   // Hash token before save to DB
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");
console.log(hashedToken);


// Save token to DB
await new Token ({
    userId: user._id,
    token: hashedToken,
    createAt: Date.now(),
    expiresAt: Date.now() + 40 * (60 * 1000) // 
}).save();

// reset url
const resetUrl = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;

// Reset Email
const message = `
    <h2> hello ${user.name} </h2>
    <p>Please use the url </p>
    <p> This reset link is valid for only 30minutes </p>
`

res.status(200).json("email sended")
})

module.exports = {
    registerUser,
    loginUser,
    logout,
    getUser,
    logginStatus,
    updateUser,
    changePassword,
    forgotPassword,
};

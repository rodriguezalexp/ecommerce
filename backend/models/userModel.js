const mongoose = require("mongoose") /* importacion de mongoose */

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, "Please add a name"] 
    },
    email: {
        type: String,
        require: [true, "please add an email"],
        unique: true,
        trim: true, // delete whitespaces
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,"Please enter a valid email"
        ]
    },
    password: {
        type: String,
        require: [true, "please enter a password"],
        minLength: [6, "The password must contain 6 characters"],
        maxLenght: [33, "The max length for password is 33 characters"],

    },
    photo: {
        type: String,
        require: [true, "please add a photo"],
        default: ""
    },
    phoneNumber: {
        type: String,
        default: "+54"
    },
    bio: {
        type: String,
        default: "please write something about you",
        maxLenght: [500, "The max length is 500 characters"]
    }
});

const User = mongoose.model("User", userSchema)
const Email = mongoose.model("Email", userSchema)
module.exports = User, Email
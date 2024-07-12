const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, "Please add a name"]
}
});

const User = mongoose.model("User", userSchema)
module.exports = User


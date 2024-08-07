const express = require("express");
const { registerUser, loginUser } = require("../controllers/userController");
const router = express.Router();

//const registerUser = () => {};

router.post("/register", registerUser); // post information from front to backend
router.post("/login", loginUser);


module.exports = router

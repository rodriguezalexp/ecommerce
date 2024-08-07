const express = require("express");
const { registerUser, loginUser, logout } = require("../controllers/userController");
const router = express.Router();

//const registerUser = () => {};

router.post("/register", registerUser); // post information from front to backend
router.post("/login", loginUser);
router.get("/logout", logout)


module.exports = router

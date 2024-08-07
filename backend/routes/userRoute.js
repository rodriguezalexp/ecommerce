const express = require("express");
const { registerUser, loginUser, logout, getUser } = require("../controllers/userController");
const router = express.Router();

//const registerUser = () => {};

router.post("/register", registerUser); // post information from front to backend
router.post("/login", loginUser);
router.get("/logout", logout);
router.get("/getuser", getUser);



module.exports = router

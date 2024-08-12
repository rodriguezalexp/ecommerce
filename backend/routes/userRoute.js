const express = require("express");
const { registerUser, loginUser, logout, getUser, logginStatus, updateUser} = require("../controllers/userController");
const protect = require("../middleWare/authMiddleware")
const router = express.Router();

//const registerUser = () => {};

router.post("/register", registerUser); // post information from front to backend
router.post("/login", loginUser);
router.get("/logout", logout);
router.get("/getuser", protect, getUser);
router.get("/loggedin", logginStatus);
router.patch("/updateuser", updateUser);


module.exports = router

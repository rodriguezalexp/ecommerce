const express = require("express");
const { registerUser, loginUser, logout, getUser, logginStatus, updateUser, changePassword, forgotPassword} = require("../controllers/userController");
const protect = require("../middleWare/authMiddleware")
const router = express.Router();


router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logout);
router.get("/getuser", protect, getUser);
router.get("/loggedin", logginStatus);
router.patch("/updateuser", protect, updateUser);
router.patch("/changepassword", protect, changePassword)
router.post("/forgotpassword", forgotPassword)

module.exports = router

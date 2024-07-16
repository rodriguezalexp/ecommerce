const express = require("express");
const { registerUser } = require("../controllers/userController");
const router = express.Router();

//const registerUser = () => {};

router.post("/register", registerUser) // post information from front to backend

module.exports = router
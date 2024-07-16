const express = require("express");
const router = express.Router();

//const registerUser = () => {};

router.post("/register", registerUser) // post information from front to backend

module.exports = router
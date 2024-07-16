const express = require("express");
const router = express.Router();



router.post("/register", registerUser) // post information from front to backend

module.exports = router
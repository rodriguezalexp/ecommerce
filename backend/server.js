const dotenv = require("dotenv").config();
const mongoose = require("mongoose")
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");

const app = express(); // starting express

const PORT = process.env.PORT || 5000;


// Connect to DB and start server

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server Running on port ${PORT}`);
        });
    })
    .catch(error => {
        console.log('Connection error', error);
    });


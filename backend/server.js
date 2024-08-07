const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const userRoute = require("./routes/userRoute");
const errorHandler = require("./middleWare/errorMiddleware");
const cookieParser = require("cookie-parser");

const app = express(); // starting express

//Middlewares (Handle Json data into app)

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

// Routes Middlewares

app.use("/api/users", userRoute); 

// Routes

app.get("/", (req, res) => {
    res.send("Home Page")
});

// Error Middlewares

app.use(errorHandler) //Set and calling error handler

// Connect to DB and start server

const PORT = process.env.PORT || 5000;

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

 
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { compare } = require("bcryptjs");

const protect = asyncHandler ( async (res, req, next) => {
    try {
        const token = req.cookies.token
        if (!token) {
            res.status(401)
            throw new Error("Not authorized, please login")
        }

       //verify token 
       const verified = jwt.verified(token, process.env.JWT_SECRET)
       // compare token auth
       user = await User.findById(verified.id).select("-password")

       req.send(verified.id)

       if (!user) {
        res.status(401)
        throw new Error("user not found")
       }
       req.user = user
       next()
    } catch (error) {
        res.status(401)
        throw new Error("Not authorized, please login")
    }
});

module.exports = protect


// se crea una funcion asincrona con asynHandler
// se crea usa la funcion try catch para manipulacion de errores - se crea una constante llamada token que contiene el token de express, luego se crea un condicional para evaluar si el usuario tiene token valido si no se lanza un mensaje de error, luego se verifica si el token aun es valido, para esto se debe crear una constante que se crea si la comparacion de dos datos son iguales (token y JWT_SECRET), luego se crea una constante llamada user que tendra el dato del token aislado de la contraseña del usuario que esta intentando acceder
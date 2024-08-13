const nodemailer = require('nodemailer');

const sendEmail = async (req, res) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: 587,
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.EMAIL_PASS,
        }
    })
};

module.exports(sendEmail)
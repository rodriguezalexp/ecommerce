const nodemailer = require('nodemailer');

const sendEmail = async (subject, message, send_to, sent_from, reply_to) => {
    //Create email transporter
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: 587,
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.EMAIL_PASS,
        },
        tls: {
            rejectUnauthorized: false,
        }
    })

    // Options for sending email
    const options = {
        from: sent_from,
        to: send_to,
        replyTo: send_to,
        subject: subject,
        html: message, 
    }

    //Send email

    transporter.sendMail(options, function (err, info) {
        if (err) {
            console.log(err);
        } else {
            console.log(info);
        }
        
    })
};

module.exports(sendEmail);


//
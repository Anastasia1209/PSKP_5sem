const nodemailer = require('nodemailer');

function sendMail(receiver, message) {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: false,
        service: 'gmail',
        auth: {
            user: 'polinaglushin@gmail.com',
            pass: 'mxxrczzznozeacsi',
        }
    });

    const mailOptions = {
        from: 'polinaglushin@gmail.com',
        to: receiver,
        subject: 'NodeJS',
        text: message
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Ошибка при отправке письма:', error);
        } else {
            console.log('Письмо успешно отправлено:', info.response);
        }
    });
}

module.exports = sendMail;
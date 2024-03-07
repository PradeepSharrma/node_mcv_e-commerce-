const nodemailer = require('nodemailer');
const configs = process.env;


const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'pradeepsharma.vns@gmail.com',
        pass: 'iazwclvurutaxtmi',
    },
});

const mailOption = {
    from: configs.emailUser,
    to: 'pradeepsharma.vns@gmail.com',
    subject: " Testing ",
    html: '<pa> asdasdfasdfasdfasdfasdf </p>'
    // html:'<p> Hiii '+name+'plz coy this link and <a herf="http://localhost:8080/api/reset-password?token='+token+'"> reset your password </a>'
}

transport.sendMail(mailOption, function (error, info) {
    if (error) {
        console.log(error);
    } else {
        console.log("mail has been sent ", info.response)
    }
});
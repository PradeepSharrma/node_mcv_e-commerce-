const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: 'pradeepsharma.vns@gmail.com',
    pass: 'iazwclvurutaxtmi',
  },
});
// transporter.verify().then(console.log).catch(console.error);

transporter.sendMail({
    from: 'pradeepsharma.vns@gmail.com', // sender address
    to: "pradeepsharma.vns@gmail.com", // list of receivers
    subject: "Testing", // Subject line
    text: "There is a new article. It's about sending emails, check it out!", // plain text body
    html: "<b>There is a new article. It's about sending emails, check it out!</b>", // html body
  }).then(info => {
    console.log({info});
  }).catch(console.error);
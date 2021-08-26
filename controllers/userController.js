const nodemailer = require('nodemailer');

exports.sendEmail = (req,res) => {

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: process.env.SENDERMAIL,
          pass: process.env.SENDERPASS,
        },
        tls: { secureProtocol: "TLSv1_method" },
      });

    let mailOptions = {
        from: process.env.SENDERMAIL, // sender address
        to: req.body.toEmail, // list of receivers
        subject: req.body.subject, // Subject line
        text: req.body.text, // plaintext body
    };

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
        return res.status(200).json({message: 'Message sent successfully..!!', data: info.response});
    });
}
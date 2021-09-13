const nodemailer = require('nodemailer');
const multer = require('multer');
var Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "images/");
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});

var upload = multer({
    storage: Storage
}).single("image");
exports.sendEmail = (req, res) => {
    upload(req, res, function (err) {
        if (err) {
            console.log(err)
            return res.end("Something went wrong!");
        } else {
            to = req.body.to
            subject = req.body.subject
            body = req.body.body
            path = req.file.path

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
                to: to, // list of receivers
                subject: subject, // Subject line
                text: body, // plaintext body
                attachments: [
                    {
                        path: path
                    }
                ]
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    return res.status(200).json({
                        message: 'Email was not sent..!!',
                        response: error
                    });
                } else
                    res.send({message: 'Email was sent successfully..!!', response: 'success'});
                    return res.redirect('/final');
            });
        }
    })
}
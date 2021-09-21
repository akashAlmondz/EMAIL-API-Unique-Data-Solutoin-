const nodemailer = require('nodemailer');
const multer = require('multer');
const userModel = require('../models/userModel');
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
                    return res.status(400).json({
                        message: 'Email was not sent..!!',
                        response: error
                    });
                } else {
                    return res.status(200).json({message: 'Email was sent successfully..!!', response: 'success'});
                }   
            }); 
        }
    })
}


exports.Signup=(req,res)=>{
    try{
        let imei = req.body.imei;
        if(imei.toString().length === 15){
            let user = new userModel({
                imei:req.body.imei,
                mobileNumber:req.body.mobileNumber,
                email:req.body.email
            });
    
            user.save().then(data => {
                res.status(200).json({message: 'Data saved successfully..!!', data});
            }).catch(err => {
                res.status(400).json({message: 'Something went wrong..!!', data: err.message});
            });
        }
        else {
            res.status(400).json({message: 'Validation Error', data: 'Please check your IMEI Number length..!!'});
        }
    }
    catch(err) {
        res.status(500).json({message: 'Server Error..!!', data: err});
    }
}

exports.updateUser=(req,res)=>{
    userModel.findById(req.params.id).then(data => {
        userModel.findOneAndUpdate({_id:req.params.id},{details: {...data.details, ...req.body}}, {new: true }).then(data => {
            res.status(200).json({message: 'Data saved successfully..!!', data});
          }).catch(err => {
            res.status(400).json({message: 'Something went wrong..!!', data: err.message});
        });
    }).catch(err => {
        res.status(400).json({message: 'Something went wrong..!!', data: err.message});
    })
}


exports.getData=(req,res)=>{
    const userId=req.params.userId;    
    userModel.findById({_id:userId}).then(data=>{
        res.status(200).json({ data})
    }).catch(err=>{
        res.status(400).json({message: 'Something went wrong..!!', data: err.message});
    })
}
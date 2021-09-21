const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let mobileDetails = {
    contact: {
        type:Boolean,
        default: false
    },
    sms: {
       type:Boolean,
       default: false
    },
    audio: {
       type:Boolean,
       default: false
    },
    location: {
       type:Boolean,
       default: false
    },
    imageFolders: {
       type:Boolean,
       default: false
    },
    cellularNetwork: {
       type:Boolean,
       default: false
    },
    installedApps: {
       type:Boolean,
       default: false
    }   
   };

const userSchema = new Schema({
    imei: {
        type: String,
        minlength:[15,"IMEI number must be of 15 digit"],
        maxlength:[15,"IMEI number must be of 15 digit"],
        required: true,
        trim:true
    },
    mobileNumber: {
        type:String, 
        minlength:[10,"Phone number must be of 10 digit"],
        maxlength:[10,"Phone number must be of 10 digit"],
        required: true,
        trim:true
    },
    details: mobileDetails,
    email:{
        type: String,
        trim:true,
        validate: {
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email"
        },        
    },
},
{
    timestamps:true
});

const signUp = mongoose.model('users', userSchema);
module.exports = signUp;
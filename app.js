require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./routes/userRoute');
const mongoose = require('mongoose');

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

mongoose.connect(process.env.MONGOURL, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log('MongoDB Connection Established..!!');
}).catch(err => {
    console.log('Connection Failed..!!', err);
});

app.use(router);
app.get('/', (req,res) => {
    res.sendFile('index.html', {root: __dirname + '/public'});
});
app.get('/final',(req,res)=>{
    res.sendFile('final.html',{root:__dirname+'/public'});
})
module.exports = app;
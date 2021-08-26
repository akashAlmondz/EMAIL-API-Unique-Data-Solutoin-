require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./routes/userRoute');

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(router);
app.get('/', (req,res) => {
    res.sendFile('index.html', {root: __dirname + '/public'});
});

module.exports = app;
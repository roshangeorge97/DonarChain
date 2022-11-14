const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/dbconnect');
const port = process.env.PORT || 5000;
var app = express();

app.use(bodyParser.json({limit : '50mb'}));
app.use(bodyParser.urlencoded({limit : '50mb',extended : true}));


const donorsRouter = require('./routes/api/donors');
const hospitalsRouter = require('./routes/api/hospitals');
const recipientRouter = require('./routes/api/recipient');
app.use('/api/donors',donorsRouter);
app.use('/api/hospitals',hospitalsRouter);
app.use('/api/recipient',recipientRouter)

app.get("/",function(req,res){
    res.send("This is home page");
})

app.listen(port, ()=>{
    console.log(`Server is running on Port: ${port}`);
})
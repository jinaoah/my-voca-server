const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const authRouter = require("./routes/auth");
const cardRouter = require('./routes/card');
const cors = require("cors");

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors())
app.use('/',authRouter);
app.use('/',cardRouter);

app.listen('1234', ()=>{
    console.log('1234번 포트에서 대기중');
})
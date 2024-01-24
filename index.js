const express = require('express');
let port = 8080;
const app = express();

const database = require('./config/mongoose');

app.use(express.urlencoded());

app.use('/',require('./routes/indexroutes'));

app.listen(port,(error)=>{
    if(error){
        console.log(error);
        return false;
    }
    console.log("server connected "+port);
})
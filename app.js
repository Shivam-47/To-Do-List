var express=require('express');
var bodyParser=require('body-parser');
var controller=require('./controller/myController');
var app=express();
app.set('view engine','ejs');

app.listen(3000);

console.log('Listening to 3000');

controller(app);


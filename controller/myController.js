var bodyParser=require('body-parser');
var urlEncoded = bodyParser.urlencoded({extended:false});
var mysql=require('mysql');
module.exports=function(app){
var mysqlConnection=mysql.createConnection({
    host: '<HOST>',
    user: '<USER>',
    password: '<PASS>',
    database: '<DBNAME>',
    multipleStatements: true
});

mysqlConnection.connect(function(err){
    if(!err)
        console.log('Connection Successful');
    else
        console.log('ERROR :'+JSON.stringify(err));
});


app.get('/',function(req,res){
    var s1="SELECT * from todo";
    mysqlConnection.query(s1,function(err,rows,fields){
        if(!err)
            res.render('index',{r:rows});
        if(err)
            console.log('SELECT QUERY ERROR: '+JSON.stringify(err));
    })
    
});

app.post('/index.ejs',urlEncoded,function(req,res){
    var sql="INSERT INTO todo(item) VALUE ('"+req.body.item+"')";
    mysqlConnection.query(sql,function(err,rows,fields){
        if(!err){
            console.log('Success with '+rows[0]);
            res.render('post',{r:req.body.item});
        }
        else{
            console.log("ERROR of Query: "+JSON.stringify(err));
        }
    });
});
}

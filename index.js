var express = require('express');
var bodyParser = require('body-parser');
var mongoose=require('mongoose');
var app = express();
const dbConfig = require('./config/config.js');
const userService = require('./services/user-service.js');

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();//inorder to exit from nodejs program
});


app.get('/', function(req, res){
   res.render('form');
});

app.set('view engine', 'pug');
app.set('views', './views');

// for parsing application/json
app.use(bodyParser.json()); 

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded

// for parsing multipart/form-data
app.use(express.static('public'));

app.post('/', function(req, res){
   console.log('login data :', req.body);
   userService.login(req.body,res);
//    res.send("recieved your request!");
});
app.post('/status', function(req, res){
   console.log('status update data :', req.body);
   userService.changeStatus(req,res);
});
app.listen(3000,()=>{
    console.log("server running");
});
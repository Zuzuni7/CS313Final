var express = require("express");
var fs = require('fs');

const app = express();
const port = process.env.PORT || 5000;

const validate = require("./login.js");
/** 
 * GET /list
 * GET /product
 *  
*/
app.use(express.json());
app.use(express.urlencoded());
app.get("/login", login);
app.get('/', function(req,res){
  res.sendFile('./pages/login.html', {root: __dirname + "/views"});
});
app.get('/views', validate.validateLogin);

function login(req,res) {
    console.log("Received a request for " + req.url);
  
    const data = fs.readFileSync('data.json');
    var json = JSON.parse(data);
    console.log("User_id: " + json.id);
    console.log("First name: " + json.first_name);
    console.log("Last name: " + json.last_name);

    res.json(json);                    
}


app.listen(port, ()=> {
    console.log("Escuchando en la puerta: " + port);
});


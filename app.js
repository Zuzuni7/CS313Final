/**
 * Homepage where the user can view content
 * links to new pages where other content is stored.
 */
var express = require("express");
var fs = require('fs');
const {Pool} = require('pg');
DATABASE_URL='postgres://vmbubwrksilkgw:cc626155910b11cb0687f8fd0ecdd91ea48e5d5e9e2218b90b79d9d12864b256@ec2-107-22-239-155.compute-1.amazonaws.com:5432/d6h6qif4cicgvo?ssl=true';
const connectionString = process.env.DATABASE_URL || 'postgres://vmbubwrksilkgw:cc626155910b11cb0687f8fd0ecdd91ea48e5d5e9e2218b90b79d9d12864b256@ec2-107-22-239-155.compute-1.amazonaws.com:5432/d6h6qif4cicgvo?ssl=true';
const pool = new Pool({connectionString: connectionString});
//TESTING
// var sql = "SELECT * FROM users_";

// pool.query(sql, function(err, result) {
//     // If an error occurred...
//     if (err) {
//         console.log("Error in query: ")
//         console.log(err);
//     }
//     // Log this to the console for debugging purposes.
//     console.log("Back from DB with result:");
//     console.log(result.rows);
// });     


const app = express();
const port = process.env.PORT || 5000;
const path = require("path");
//const validate = require("./login.js");
/** 
 * GET user
 * GET user data
 * 
*/
app.use(express.static(path.join(__dirname, "public")))
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.get("/login", login);
app.get('/', function(req,res){
  res.sendFile('./pages/login.html', {root: __dirname + "/views"});
});
app.get("/logout.html", function(req,res) {
    //end session
    res.end;
});
app.post('/views', function(req,res) {
  const username = req.body.username;
  const password = req.body.password;
  console.log(username);
  console.log(password);
  if (req.body.username &&  req.body.password)
  {
      console.log(`Username: ${username} -- Password: ${password}`);
      if (username === "admin" && password === "password") {
        res.status(200);
        //res.send('./home.html');
        
        if (typeof req.body.username === "undefined") {
          req.body.username = username;
        }
        return res.sendFile('./pages/home.html',  {root: __dirname + "/views"});
      } 
      else 
      {
        res.status(401);
        res.send({
          success: false
        });
      }
    } 
    else
    {
     res.status(401);
     res.send({
       success: false
    });
    return res.redirect('/login');
  }
});
//app.get('/views', validate.validateLogin);

function login(req,res) {
    console.log("Received a request for " + req.url);
  
    const data = fs.readFileSync('data.json');
    var json = JSON.parse(data);
    console.log("User_id: " + json.id);
    console.log("First name: " + json.first_name);
    console.log("Last name: " + json.last_name);
    res.json(json);
}


app.listen(port, () => {
    console.log("Escuchando en puerta: " + port);
});


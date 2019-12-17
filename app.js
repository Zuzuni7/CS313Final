/**
 * Homepage where the user can view content
 * links to new pages where other content is stored.
 */
var express = require("express");
var fs = require('fs');
var url = require('url');
var {Pool} = require('pg');
DATABASE_URL='postgres://vmbubwrksilkgw:cc626155910b11cb0687f8fd0ecdd91ea48e5d5e9e2218b90b79d9d12864b256@ec2-107-22-239-155.compute-1.amazonaws.com:5432/d6h6qif4cicgvo?ssl=true';
var connectionString = process.env.DATABASE_URL || 'postgres://vmbubwrksilkgw:cc626155910b11cb0687f8fd0ecdd91ea48e5d5e9e2218b90b79d9d12864b256@ec2-107-22-239-155.compute-1.amazonaws.com:5432/d6h6qif4cicgvo?ssl=true';
var pool = new Pool({connectionString: connectionString});
var session = require('express-session');
var app = express();
var port = process.env.PORT || 5000;
var path = require("path");
//const validate = require("./login.js");
/** 
 * GET user
 * GET user data
 * 
*/
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.get('/', function(req,res){
  res.sendFile('/pages/login.html', {root: __dirname + "/views"});
});
app.get('./pages/home.html', login);
app.get("./pages/logout.html", function(req,res) {
    res.sendFile('/pages/login.html', {root: __dirname + "/views"});
});
app.post('/views', login);

function login(req,res) {
  var username = req.body.inputUsername;
  var password = req.body.inputPassword;

  //console.log(username);
  //console.log(password);
  
      var sql = "SELECT username, pw, prefered_name FROM users_ WHERE username=$1::text";
      var params = [username];

      pool.query(sql, params, function(err,db_results) {
        if (err)
        {
          console.log("Getting error in pool");
          throw err;
          
        }
        else
        {
          var results = {success:true,list:db_results};
          //console.log(db_results.rows[0].username);
          //console.log(results);
          
          if(username == db_results.rows[0].username && password == db_results.rows[0].pw)
          {
            //res.status(200).json(results.rows);
            console.log("Password matches!");
            // if (typeof username === "undefined") {
            //  username = username;
            // }
            

            res.sendFile('./pages/home.html',  {root: __dirname + "/views"});
          }
          else
          {
            res.status(401);
            console.log("username and password don't match");
            return res.sendFile('./pages/login.html',  {root: __dirname + "/views"});
           
            //Wrong username or password
          }
          //console.log("Oops. Something went wrong and its the developers fault.");
          //return res.sendFile('./pages/login.html',  {root: __dirname + "/views"});
        }
      });
}


app.listen(port, () => {
    console.log("Escuchando en puerta: " + port);
});


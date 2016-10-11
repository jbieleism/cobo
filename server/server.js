var express = require('express');
var logger = require('morgan');
var http = require('http');
var bodyParser = require('body-parser');
var request = require('request');

var port = 8000;


var app = express();

app.use(bodyParser.json())
app.use(logger('dev'))
app.use(express.static('/Users/justin/desktop/mvp/client'));


//allows for cross-origin requests
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
////


app.use('/getRecipes', function(req, res){
  console.log("this is the query yo", req.query)
  var options = {
    method: 'GET',
    url: 'http://food2fork.com/api/search',
    qs: {
      key: 'b8a91d7a8b2020d0224112bc10aca703',
      q: req.query.q
    }
  };
  request(options, function (error, response, body) {
    if (error){
      throw new Error(error);
    }
    else {
      console.log("this is the body", body)
      res.send(body)
    }
  });
})


app.use('/viewRecipe', function(req, res){
  console.log("this is the req.query :", req.query)
  var options = {
    method: 'GET',
    url: 'http://food2fork.com/api/get',
    qs:{
      key: 'b8a91d7a8b2020d0224112bc10aca703',
      rId: req.query.id
    }
  };
  request(options, function(error, response, body){
    if (error){
      throw new Error(error)
    } else {
      res.send(body)
    }
  })
})


app.listen(port, function(){
  console.log('Listening on port: ', port)
});



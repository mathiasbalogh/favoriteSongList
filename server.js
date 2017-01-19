var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var songs = require('./data');

var app = express();


app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true})); //convert any url encoded body into a JS object

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/songs', function(req, res){
  res.send(songs);
});

app.post('/songs', function(req,res){
  var duplicate = false;
  songs.forEach(function(song){
    if(req.body.title == song.title && req.body.artist == song.artist){
      duplicate = true;
    }else if (req.body.title == '' || req.body.artist == '' || req.body.album == ''){
      duplicate = true;
    }else{
      return duplicate;
    }
  });
    if(duplicate == true && req.body.title == '' || req.body.artist == '' || req.body.album == ''){
      res.sendStatus(418);
    }else if(duplicate == true){
      res.sendStatus(400);
    }else{
      var date = new Date();
      req.body.dateAdded = date.toLocaleDateString('en-US');
      songs.push(req.body);
      res.sendStatus(200);
    }

});


app.listen(3000);

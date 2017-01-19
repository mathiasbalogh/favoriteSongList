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
    if(req.body.title == song.title && req.body.artist == song.artist && req.body.album == song.album){
      duplicate = true; //this conditional checks for duplicate songs
    }else if (req.body.title == '' || req.body.artist == '' || req.body.album == ''){
      duplicate = true; //this conditional checks for empty fields in the form
    }else{
      return duplicate; //this is for a success response
    }
  });
    if(duplicate == true && req.body.title == '' || req.body.artist == '' || req.body.album == ''){
      res.sendStatus(418); //this will specify sending out a empty field error message
    }else if(duplicate == true){
      res.sendStatus(400); //this specifies sending out a duplicate song error message
    }else{
      var date = new Date(); //creates var holding current date and time
      req.body.dateAdded = date.toLocaleDateString('en-US'); //formats date to avoid superfluous information
      songs.push(req.body);
      res.sendStatus(200);
    }

});


app.listen(3000);

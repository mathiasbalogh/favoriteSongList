$(function(){

  getSongs();

  $('#addSong').on('submit', addSong);

});

function displaySongs(songs){
  $('#songs').empty();
    songs.forEach(function(song){
      if('dateAdded' in song){
        $('#songs').append('<li>'+song.title+' by '+song.artist+' on '+song.album+'. Song added: '+song.dateAdded+'</li>');
      }else{
        $('#songs').append('<li>'+song.title+' by '+song.artist+' on '+song.album+'</li>');
      }
    });
}
function addSong(event){
  event.preventDefault();

  var songData = $(this).serialize();

  $.ajax({
      url: '/songs',
      type: 'POST',
      data: songData,
      success: getSongs,
      statusCode: {
        400:err,
        418:errEmpty    //this sets possible error code and ties them to an alert
      }
  });
  this.reset();
}
function getSongs(){
  $.ajax({
    url: '/songs',
    type: 'GET',
    success: displaySongs
  });

}
function err(){ //used to specify alert message to user
  alert('Oops! It looks like we have that one already! Please try again');
}
function errEmpty(){  //used to specify alert message to user
  alert('Oops! One of the fields was left blank! Please try again');
}

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
        418:errEmpty
      }
  });
}
function getSongs(){
  $.ajax({
    url: '/songs',
    type: 'GET',
    success: displaySongs
  });

}
function err(){
  alert('Oops! It looks like we have that one already! Please try again');
}
function errEmpty(){
  alert('Oops! One of the fields was left blank! Please try again');
}

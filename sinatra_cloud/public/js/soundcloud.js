window.onload = function(){
  // document.getElementById('connect').addEventListener('click', function(){
  //   SC.initialize({
  //     client_id: '456177910e695bec31abd882ed77fedb',
  //     redirect_uri: 'http://localhost:4567/home'
  //   });
  //   SC.connect(function() {
  //     SC.get('/me', getTracksForUser);
  //   });
  // })
  // initialize client with app credentials
  // SC.initialize({
  //   client_id: '456177910e695bec31abd882ed77fedb',
  //   redirect_uri: 'http://localhost:4567/home'
  // });

  // // initiate auth popup
  // SC.connect(function() {
  //   SC.get('/me', getTracksForUser);
  // });

  // SC.oEmbed('https://soundcloud.com/fadermedia/fader-moma-ps1-warm-up-mix-17', {}, document.getElementById('embedder'))
  // SC.stream("/tracks/293", function(sound){
  //   sound.play();
  // });
  // SC.get('/tracks/117744557', function(sound){
  //   sound1 = sound
  // })
}



var sound1 = 'hi';
var currentUser;
var tracks = [];
var comments;;

function getTracksForUser(current) {
  currentUser = current;
  setTimeout(function(){
    SC.get('/me/activities', function(user) {
      user.collection.forEach(function(element, index) {
        console.log(element)
        tracks.push({
          title: element.origin.title, 
          id: '/tracks/' + element.origin.id, 
          artwork: element.origin.artwork_url,
          embed: element.origin.permalink_url
        })
      })
    })
  },1000)
}

function embedTrack(track) {
  SC.oEmbed(track.embed, {}, document.getElementById('embedder'));
  getComments(track)
}

function getComments(track) {
  console.log(track)
  SC.get(track.id + '/comments', function(commentQuery) {
    comments = commentQuery
  })
}
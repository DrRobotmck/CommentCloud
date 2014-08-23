var MainView = Backbone.View.extend({
	el: '#container',
	initialize: function() {
		console.log('Initialized main view');
		SC.initialize({
			client_id: '456177910e695bec31abd882ed77fedb',
      redirect_uri: 'http://localhost:3000/home'
		});
		this.getUser();
    this.counter = 0;
	},
	getUser: function() {
		SC.connect(function() {
      SC.get('/me', function(user) {
      	console.log(user)
      	this.user = user;
        this.collection.getTracks();
      }.bind(this));
    }.bind(this));
	},
  events: {
    'click h1.start': 'getStream',
    'click h1.next': 'nextTrack'
  },
  getStream: function() {
    var mainView = this;
    var track = mainView.collection.models[mainView.counter];
    mainView.$('#track').replaceWith(HandlebarsTemplates['track'](track.toJSON()));
    SC.stream('/tracks/'+ track.get('origin').id, {
      auto_play: true,
      ontimedcomments: function(comments) {
        _.each(comments, function(comment){
          var randomId = Math.floor(Math.random() * 3);
          var commentView = new CommentView({model: comment});
          console.log('hi', mainView)
          mainView.$('#section'+ randomId).append(commentView.el);
          setTimeout(function(){commentView.animate()},1000);
        });
      }
    }, function(sound){
      mainView.sound = sound;
      mainView.sound.play();
      mainView.playChecker = setInterval(function() {
        if (mainView.sound.playState == 0) { 
          mainView.nextTrack() 
        }
      }, 1000);
    });
  },
  nextTrack: function () {
    clearInterval(this.playChecker);
    if(this.sound.playState == 1) {this.sound.stop()}
    this.counter++;
    this.getStream();
  }
});
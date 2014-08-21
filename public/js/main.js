var MainView = Backbone.View.extend({
	el: '#container',
	initialize: function() {
		console.log('Initialized main view');
		SC.initialize({
			client_id: '456177910e695bec31abd882ed77fedb',
      redirect_uri: 'https://localhost:4567/home'
		});
		this.getUser();
		this.getTracks();
	},
	getUser: function() {
		SC.connect(function() {
      SC.get('/me', function(user) {
      	this.user = user;
      }.bind(this));
    }.bind(this));
	},
	getTracks: function() {
		
	}
});

var SongModel = Backbone.Model.extend({
	initialize: function() {
		console.log('New model created');
	}
});

var SongCollection = Backbone.Collection.extend({
	initialize: function() {
		console.log('New Collection')
	},
	model: SongModel,
	getTracks: function(){
		SC.get('/me/activities', this.addTracks)
	},
	addTracks: function(user){
		user.collection.forEach(function(song){
			console.log(this)
			this.add(song);
		}.bind(this))
	}
});
var tracksCollection = new SongCollection;
var main = new MainView({collection: tracksCollection})
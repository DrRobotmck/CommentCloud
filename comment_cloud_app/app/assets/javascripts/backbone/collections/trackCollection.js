var SongCollection = Backbone.Collection.extend({
	initialize: function() {
		console.log('New Collection')
	},
	model: SongModel,
	getTracks: function(){
		SC.get('/me/activities', this.addTracks.bind(this))
	},
	addTracks: function(user){
		user.collection.forEach(function(song){
			this.add(song);
		}.bind(this));
	}
});